import type { Category, CategoryWithPackages } from "~/types";

export function getCategories(basketIdent?: string): Promise<Category[]>;

export function getCategories(
    basketIdent?: string,
    includePackages?: true,
): Promise<CategoryWithPackages[]>;

export function getCategories(
    basketIdent?: string,
    includePackages?: false,
): Promise<Category[]>;

export function getCategories(
    basketIdent?: string,
    includePackages: boolean = true,
) {
    return useAPI<Category[] | CategoryWithPackages[]>(
        "accounts",
        "/categories",
        {
            query: {
                basketIdent: basketIdent,
                includePackages: includePackages ? 1 : 0,
            },
        },
    );
}
