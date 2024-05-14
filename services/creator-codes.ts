import type { Message } from "~/types";

export const applyCreatorCode = (basketId: string, creatorCode: string) =>
    useAPI<Message>("baskets", `/${basketId}/creator-codes`, {
        method: "POST",
        body: {
            creator_code: creatorCode,
        },
    });

export const removeCreatorCode = (basketId: string, creatorCode: string) =>
    useAPI<Message>("baskets", `/${basketId}/creator-codes/remove`, {
        method: "POST",
        body: {
            creator_code: creatorCode,
        },
    });
