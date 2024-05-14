<template>
    <Hero
        :title="$t('index.hero.title')"
        :subtitle="$t('index.hero.subtitle')"
        image="/sky.png"
        class="mb-8"
    />

    <div class="container">
        <div
            v-if="categories && categories.length > 3"
            class="row justify-center"
        >
            <div
                class="col-auto"
                v-for="category in categories"
                :key="category.id"
            >
                <NuxtLink
                    class="category-link"
                    tag="a"
                    :to="{
                        hash: `#${titleCase(category.name)}`,
                    }"
                >
                    <CategoryCard
                        :image="category.packages[0].image"
                        :category="category"
                    />
                </NuxtLink>
            </div>
        </div>

        <div class="d-flex my-5 w-100"></div>

        <div
            v-for="category in categories"
            :key="category.id"
            :id="titleCase(category.name)"
            class="category"
        >
            <HeaderCard>
                <NuxtImg
                    :src="category.packages[0].image"
                    :alt="category.name"
                    width="60px"
                    class="mr-3"
                />

                <h3>{{ category.name }}</h3>
            </HeaderCard>

            <div class="row">
                <div
                    class="col-12 col-sm-6 col-md-4 col-lg-3"
                    v-for="pkg in category.packages"
                    :key="pkg.id"
                >
                    <PackageCard
                        :pkg="pkg"
                        :row="category.packages.length === 1"
                        hide-options
                    />
                </div>
            </div>
        </div>
    </div>

    <!-- Holds the login modal -->
    <NuxtPage />
</template>

<script lang="ts" setup>
const { t } = useI18n();

useSeoMeta({
    ogTitle: t("index.hero.title"),
    description: t("index.hero.subtitle"),
    ogDescription: t("index.hero.subtitle"),
    ogImage: "/Eleria.png",
    twitterCard: "summary_large_image",
});

const categoryStore = useCategoryStore();
const { data: categories } = await useAsyncData("categories", () => {
    return categoryStore.fetchCategories();
});
</script>

<style scoped lang="scss">
.category {
    margin-bottom: 40px;
    &-link {
        text-decoration: none;
    }
}
</style>
