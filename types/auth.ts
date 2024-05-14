import type { BasketAuthMethod } from ".";

export interface Auth {
    username: string;
    userId: string;
    method?: BasketAuthMethod;
}
