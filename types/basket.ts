import type { PackageInBasket } from "./package";

export interface Coupon {
    code: string;
}

export interface GiftCard {
    card_number: string;
}

export interface Basket {
    ident: string;
    complete: boolean;
    id: number;
    country: string;
    ip: string;
    username_id: string;
    username: string;
    cancel_url: string | null;
    complete_url: string | null;
    complete_auto_redirect: boolean;
    base_price: number;
    sales_tax: number;
    total_price: number;
    currency: string;
    packages: PackageInBasket[];
    coupons: Coupon[];
    giftcards: GiftCard[];
    creator_code: string | null;
}

export interface BasketAuthMethod {
    name: string;
    url: string;
}

export interface Message {
    message: string;
}
