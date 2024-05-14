import { StorageSerializers, useStorage } from "@vueuse/core";
import { skipHydrate } from "pinia";
import type { BasketAuthMethod, Auth } from "~/types";

export const useAuthStore = defineStore("auth", () => {
    const appConfig = useAppConfig();
    const AUTH_STORAGE_KEY = `@${titleCase(appConfig.storeName)}/auth`;

    const basketStore = useBasketStore();

    const auth = useStorage<Auth>(AUTH_STORAGE_KEY, null, undefined, {
        serializer: StorageSerializers.object,
    });

    const isAuthenticated = computed(() => {
        return !!auth.value?.username;
    });

    async function login(user: string) {
        // Create a basket for the user
        try {
            const basket = await basketStore.createBasket(user);
            auth.value = {
                username: user,
                userId: basket.username_id,
            };
        } catch (error) {
            throw new Error("Failed to login!");
        }
    }

    function loginRedirect(method: BasketAuthMethod) {
        auth.value = {
            ...auth.value,
            method,
        };

        try {
            window.location.replace(method.url);
        } catch (error) {
            auth.value.method = undefined;
            throw new Error("Failed to redirect");
        }
    }

    async function getAuthMethods(
        redirectAfter?: string,
    ): Promise<BasketAuthMethod[]> {
        if (!basketStore.basket) {
            await basketStore.createBasket();
        }

        // Redirect to external redirect page
        return await getBasketAuthMethods(
            basketStore.basket.ident,
            window.location.origin +
                (redirectAfter ? `?redirect=${redirectAfter}` : ""), // Go back to the home page
        );
    }

    async function loginCompleted() {
        const basket = await basketStore.getBasket();

        if (!basket?.value.username || !basket?.value.username_id) {
            throw new Error("Failed to login!");
        }

        // Update the user info
        auth.value = {
            ...auth.value,
            username: basket?.value.username,
            userId: basket?.value.username_id,
        };
    }

    function logout() {
        auth.value = null;
        basketStore.destroyBasket();
    }

    const webstoreStore = useWebstoreStore();

    const loginRoute = computed(() => {
        return webstoreStore.webstore?.platform_type.includes("Minecraft")
            ? "/login"
            : "/login-redirect";
    });

    function getLoginRoute(redirectAfter?: string) {
        return (
            loginRoute.value +
            (redirectAfter ? `?redirect=${redirectAfter}` : "")
        );
    }

    return {
        user: skipHydrate(auth),
        isAuthenticated,
        login,
        logout,
        loginRedirect,
        loginCompleted,
        getAuthMethods,
        loginRoute,
        getLoginRoute,
    };
});
