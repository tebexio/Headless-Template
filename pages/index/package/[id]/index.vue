<template>
    <Modal v-model="open" width="700px" @hidden="router.push('/')">
        <PackageCard
            v-if="pkg && !pending"
            :pkg="pkg"
            show-description
            hide-options
            @add-to-cart="open = false"
        />

        <div v-else class="d-flex align-center justify-center ma-6">
            <Loader size="56px" />
        </div>
    </Modal>
</template>

<script setup lang="ts">
definePageMeta({
    scrollToTop: false,
});

const router = useRouter();
const { open } = useModalPage();

const route = useRoute();
const id = computed(() => route.params.id as string);
const { t } = useI18n();

const { data: pkg, error, pending } = useAsyncData(() => getPackage(id.value));

if (error.value) {
    showError({ message: t("error.page_not_found"), statusCode: 404 });
}

useHead({
    title: t("titles.package", { name: pkg?.value?.name }),
    meta: [
        {
            hid: "description",
            name: "description",
            content: pkg?.value?.description,
        },
    ],
});
</script>

<style scoped lang="scss">
@use "~/assets/styles/settings" as *;

.package-card {
    padding-top: 0;
}
</style>
