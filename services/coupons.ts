import type { Message } from "~/types";

export const applyCoupon = (basketId: string, couponCode: string) =>
    useAPI<Message>("baskets", `/${basketId}/coupons`, {
        method: "POST",
        body: {
            coupon_code: couponCode,
        },
    });

export const removeCoupon = (basketId: string, couponCode: string) =>
    useAPI<Message>("baskets", `/${basketId}/coupons/remove`, {
        method: "POST",
        body: {
            coupon_code: couponCode,
        },
    });
