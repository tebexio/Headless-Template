import type { Message } from "~/types";

export const applyGiftCard = (basketId: string, giftCardNumber: string) =>
    useAPI<Message>("baskets", `/${basketId}/giftcards`, {
        method: "POST",
        body: {
            card_number: giftCardNumber,
        },
    });

export const removeGiftCard = (basketId: string, giftCardNumber: string) =>
    useAPI<Message>("baskets", `/${basketId}/giftcards/remove`, {
        method: "POST",
        body: {
            card_number: giftCardNumber,
        },
    });
