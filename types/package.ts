import type { Category } from "./category";

export interface Package {
    id: number;
    name: string;
    base_price: number;
    total_price: number;
    currency: string;
    discount: number;
    sales_tax: number;
    type: string;
    description: string;
    category: Pick<Category, "id" | "name">;
    image: string;
    created_at: string | null;
    updated_at: string;
    expiration_date: string | null;
    disable_gifting: boolean;
    disable_quantity: boolean;
}

interface PackageVariableOption {
    id: number;
    name: string;
    value: string;
    price: number;
    percentage: number;
}

export interface PackageVariable {
    id: number;
    identifier: string;
    description: string;
    type:
        | "dropdown"
        | "alpha"
        | "numeric"
        | "alphanumeric"
        | "username"
        | "email"
        | "text";
    options?: PackageVariableOption[];
}

export type PackageVariableData = Record<PackageVariable["identifier"], any>;

export type PackageOption = "1x" | "5x" | "10x";

interface InBasket {
    gift_username: string;
    gift_username_id: string;
    price: number;
    quantity: number;
}

export type PackageInBasket = Pick<
    Package,
    "id" | "description" | "image" | "name"
> & {
    in_basket: InBasket;
};

export type MaybePackageWithVariables = Package & {
    variables?: PackageVariable[];
};
