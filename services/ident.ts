import type { User } from "~/types/user";

export const gameUsernameToId = (
    username: string,
    gameTypeId: string | number,
) =>
    useIdentApi<User>(`/gametypes/${gameTypeId}/username/${username}`, {
        query: {
            type: "username",
        },
    });
