<template>
    <Sidebar
        v-if="categories && categories.length > 3"
        v-model="isActive"
        position="left"
    >
        <template #header>
            <h4 class="menu__title">
                {{ $t("sidebar.menu") }}
            </h4>

            <Button
                class="menu__close"
                variant="clear"
                @click="uiStore.toggleItem('menu-sidebar')"
                icon="close"
            ></Button>
        </template>

        <div class="d-flex flex-column ga-5 px-5 w-100">
            <Button
                v-for="category in categories"
                :key="category.id"
                block
                @click="uiStore.toggleItem('menu-sidebar', false)"
                tag="a"
                :to="{
                    hash: `#${titleCase(category.name)}`,
                }"
                size="lg"
                variant="tertiary"
                class="category__button"
            >
                <template #prepend>
                    <NuxtImg
                        v-if="category.packages[0].image"
                        :src="category.packages[0].image"
                        :alt="category.name"
                        width="50px"
                        height="50px"
                        loading="lazy"
                    ></NuxtImg>
                </template>

                {{ category.name }}
            </Button>
        </div>
    </Sidebar>
</template>

<script setup lang="ts">
const uiStore = useUIStore();

const categoryStore = useCategoryStore();
const { data: categories } = await useAsyncData("categories", () => {
    return categoryStore.fetchCategories();
});

const isActive = computed({
    get() {
        return uiStore.isItemActive("menu-sidebar");
    },
    set(value) {
        uiStore.toggleItem("menu-sidebar", value);
    },
});
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;

.menu__title {
    margin-inline: auto;
    font-weight: bold;
    color: $c-800;
}

.menu__close {
    position: absolute;
    right: 20px;
}

.category__button {
    justify-content: flex-start;
    font-size: 20px;
}
</style>
