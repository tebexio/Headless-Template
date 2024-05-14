import type { CategoryWithPackages } from "~/types";

export const useCategoryStore = defineStore("category", () => {
    const basketStore = useBasketStore();

    const categories = ref<CategoryWithPackages[]>([]);

    // Fetch categories for the current basket
    const fetchCategories = async () => {
        const data = await getCategories(basketStore.basketId!);

        categories.value = data;

        return data;
    };

    return {
        categories,
        fetchCategories,
    };
});
