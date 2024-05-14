import type { Basket, BasketAuthMethod } from "~/types";

export const createBasket = (username?: string) =>
    useAPI<Basket>(
        "accounts",
        "/baskets",
        {
            method: "POST",
            body: {
                username,
            },
        },
        false,
    );

export const getBasket = (basketId: string) =>
    useAPI<Basket>("accounts", `/baskets/${basketId}`);

export const addPackageToBasket = (
    basketId: string,
    packageId: string,
    quantity: number,
    variables?: Record<string, string>,
) =>
    useAPI<Basket>(
        "baskets",
        `/${basketId}/packages`,
        {
            method: "POST",
            body: {
                package_id: packageId,
                quantity,
                variable_data: variables,
            },
        },
        false,
    );

export const removePackageFromBasket = (basketId: string, packageId: string) =>
    useAPI<Basket>("baskets", `/${basketId}/packages/remove`, {
        method: "POST",
        body: {
            package_id: packageId,
        },
    });

export const giftPackage = (
    basketId: string,
    packageId: string,
    targetGiftUsernameId: string,
    variables?: Record<string, string>,
) =>
    useAPI<Basket>("baskets", `/${basketId}/packages`, {
        method: "POST",
        body: {
            package_id: packageId,
            target_username_id: targetGiftUsernameId,
            variable_data: variables,
        },
    });

export const getBasketAuthMethods = (basketId: string, returnUrl: string) =>
    useAPI<BasketAuthMethod[]>(
        "accounts",
        `/baskets/${basketId}/auth?returnUrl=${returnUrl}`,
    );
