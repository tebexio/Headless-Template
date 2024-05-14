import type { Package } from "./package";

export interface Category {
    id: number;
    name: string;
    description: string;
    parent: number;
    order: number;
    display_type: "list" | "grid";
}

export interface CategoryWithPackages extends Category {
    packages: Package[];
}
