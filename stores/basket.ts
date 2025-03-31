import { StorageSerializers, useStorage } from "@vueuse/core";
import type { Basket, Package, PackageVariableData } from "~/types";
import * as services from "~/services";
import { skipHydrate } from "pinia";

interface BasketAction {
    type: "add" | "gift";
    packageId: number;
    quantity?: number;
    targetUsername?: string;
}

export const useBasketStore = defineStore("basket", () => {
    const appConfig = useAppConfig();

    const BASKET_STORAGE_KEY = `@${titleCase(appConfig.storeName)}/basket`;
    const BASKET_ACTIONS_STORAGE_KEY = `@${titleCase(appConfig.storeName)}/basket/actions`;

    const toastStore = useToastStore();
    const authStore = useAuthStore();
    const webStoreStore = useWebstoreStore();

    const router = useRouter();
    const { t } = useI18n();

    // Basket state, stored in local storage
    const basket = useStorage<Basket>(BASKET_STORAGE_KEY, null, undefined, {
        serializer: StorageSerializers.object,
    });

    // Store the basket ID in a cookie for access server side for SSR
    const basketId = useCookie<string | null>("basketId", {
        default: () => null,
        expires: new Date(Date.now() + 6.048e8), // 1 week
        path: "/",
    });

    // Store the IP address in a cookie for access server side for SSR
    const ipAddress = useCookie<string | null>("ipAddress", {
        default: () => null,
        expires: new Date(Date.now() + 6.048e8), // 1 week
        path: "/",
    });

    // A map of the current basket, indexed by the package ID
    const packages = computed(() => {
        const packages = basket.value?.packages ?? [];
        return new Map(packages.map((p) => [p.id, p]));
    });

    const hasBasket = computed(() => {
        return basket.value && !basket.value?.complete;
    });

    // Creates a new basket
    async function createBasket(username?: string) {
        const newBasket = await services.createBasket(username);

        basket.value = newBasket;
        basketId.value = newBasket.ident;
        ipAddress.value = newBasket.ip;

        return basket.value;
    }

    // Get the current basket from the API
    async function getBasket() {
        // No basket is present
        if (basketId.value === null)
            return;

        try {
            basket.value = await services.getBasket(basketId.value);
        }
        catch(err: any) {
            // After some time, discarded baskets may be deleted
            // If this happens, we need to clear the basket we have stored by setting it back to null
            if (err.message === "Basket not found") {
                basket.value = null;
                basketId.value = null;
                return;
            }
            throw err;
        }

        return basket;
    }

    // Destroy the current basket
    function destroyBasket() {
        basket.value = null;
        basketId.value = null;
        ipAddress.value = null;
    }

    // Store the packages that are currently being added/removed
    const packagesLoading = reactive<Set<Package["id"]>>(new Set());

    // Store any actions that need to be performed after login
    const pendingActions = useStorage<BasketAction[]>(
        BASKET_ACTIONS_STORAGE_KEY,
        [],
    );

    function clearPendingActions() {
        pendingActions.value = [];
    }

    // Flush any pending actions and perform them
    async function flushActions() {
        for (const action of pendingActions.value) {
            if (action.type === "add") {
                await addPackageToBasket(action.packageId, action.quantity);
            } else if (action.type === "gift" && action.targetUsername) {
                await giftPackage(action.packageId, action.targetUsername);
            }
        }

        clearPendingActions();
    }

    // Add an action to be performed after login
    async function addPendingAction(action: BasketAction) {
        pendingActions.value.push(action);
    }

    // Watch for authentication changes and flush any pending actions
    watch(
        () => authStore.isAuthenticated,
        async (isAuthenticated, prevValue) => {
            if (isAuthenticated && !prevValue) {
                flushActions();
            }
        },
    );

    /**
     * Add a package to the current basket
     *
     * @param packageId the id of the package
     * @param quantity the number of packages to add
     * @param variables if the package had configured variables, these should be passed
     * @returns the updated basket
     */
    async function addPackageToBasket(
        packageId: number,
        quantity: number = 1,
        variables?: PackageVariableData,
    ): Promise<Basket | undefined> {
        // Ensure the user is logged in and has a basket first!
        if (!authStore.isAuthenticated) {
            // Store the action to be performed after login
            addPendingAction({
                type: "add",
                packageId,
                quantity,
            });

            await router.push(authStore.getLoginRoute());
            return;
        }

        // Check if the package requires variables to be set
        const pkg = await services.getPackage(packageId.toString());

        if (pkg.variables && !variables) {
            // Store the action to be performed after setting variables
            await router.push(`/package/${packageId}/variables`);
            return;
        }

        let updatedBasket: Basket;

        try {
            packagesLoading.add(packageId);

            updatedBasket = await services.addPackageToBasket(
                basket.value.ident,
                packageId.toString(),
                quantity,
                variables,
            );

            basket.value = updatedBasket;
        } catch (error) {
            const message = (error as Error).message || "Server error";

            toastStore.addToast(
                message === "Server error"
                    ? t("error.cannot_add_package")
                    : message,
                {
                    type: "error",
                },
            );

            return;
        } finally {
            packagesLoading.delete(packageId);
        }

        toastStore.addToast(
            t("messages.success.added_to_cart", { name: pkg.name }),
            {
                type: "success",
            },
        );

        return basket.value;
    }

    /**
     * Remove a package to the current basket
     *
     * @param packageId the id of the package to remove
     * @returns the updated basket
     */
    async function removePackageFromBasket(packageId: number) {
        if (!basket.value) {
            throw new Error("Basket not found");
        }

        packagesLoading.add(packageId);

        const pkg = packages.value.get(packageId);

        let updatedBasket: Basket;

        try {
            updatedBasket = await services.removePackageFromBasket(
                basket.value.ident,
                packageId.toString(),
            );
        } finally {
            packagesLoading.delete(packageId);
        }

        basket.value = updatedBasket;

        toastStore.addToast(
            t("messages.success.removed_from_cart", { name: pkg?.name }),
            {
                type: "success",
            },
        );

        return basket.value;
    }

    /**
     * Remove a package to the current basket
     *
     * @param packageId the id of the package to remove
     * @param targetUsername the username of the user to gift the package to
     * @param variables if the package had configured variables, these should be passed
     * @returns the updated basket
     */
    async function giftPackage(
        packageId: number,
        targetUsername: string,
        variables?: PackageVariableData,
    ) {
        // Ensure the user is logged in and has a basket first!
        if (!authStore.isAuthenticated) {
            // Store the action to be performed after login
            addPendingAction({
                type: "gift",
                packageId,
                targetUsername,
            });

            await router.push(authStore.getLoginRoute());
            return;
        }

        let targetGiftUsernameId = null;

        if (!webStoreStore.webstore?.platform_type_id) {
            throw new Error(
                "Game type not found, ensure the webstore is loaded",
            );
        }

        try {
            const { id } = await services.gameUsernameToId(
                targetUsername,
                webStoreStore.webstore.platform_type_id,
            );
            targetGiftUsernameId = id;
        } catch (error) {
            return;
        }

        let updatedBasket: Basket;

        try {
            packagesLoading.add(packageId);

            updatedBasket = await services.giftPackage(
                basket.value.ident,
                packageId.toString(),
                targetGiftUsernameId,
                variables,
            );

            basket.value = updatedBasket;
        } finally {
            packagesLoading.delete(packageId);
        }

        const pkg = updatedBasket.packages.find((pkg) => pkg.id === packageId);

        toastStore.addToast(
            t("messages.success.added_to_cart", { name: pkg?.name }),
            {
                type: "success",
            },
        );
    }

    return {
        basketId,
        ipAddress,
        basket: skipHydrate(basket),
        hasBasket: skipHydrate(hasBasket),
        packagesLoading: skipHydrate(packagesLoading),
        packages,
        createBasket,
        getBasket,
        destroyBasket,
        addPackageToBasket,
        removePackageFromBasket,
        giftPackage,
        clearPendingActions,
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBasketStore, import.meta.hot));
}
