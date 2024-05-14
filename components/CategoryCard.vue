<template>
    <div class="category-card">
        <div class="category-card__image">
            <NuxtImg
                :src="image"
                :alt="$t('category.image_alt', { name: category.name })"
                width="80px"
                height="80px"
            />
        </div>

        <div class="category-card__header">
            <h4>{{ category.name }}</h4>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Category } from "~/types";

interface CategoryCardProps {
    image: string;
    category: Category;
}

defineProps<CategoryCardProps>();
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;

.category-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1/ 1;
    border-radius: $category-card-border-radius;
    border: $category-card-border;
    min-width: $category-card-min-width;

    img {
        object-fit: contain;
    }
}
</style>
