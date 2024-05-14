<template>
    <Modal v-model="open" @hidden="router.push('/')">
        <div v-if="pkg">
            <h5>{{ pkg.name }}</h5>

            <Input
                :label="
                    $t('gift.input_placeholder', {
                        gameTypeName: appConfig.gameTypeName,
                    })
                "
                v-model="targetUsernameId"
            />

            <Button
                :disabled="!targetUsernameId"
                :loading="isSubmitting"
                @click="submit(pkg.id, targetUsernameId)"
            >
                {{ $t("buttons.add_gift_to_cart") }}
            </Button>
        </div>

        <div v-else class="d-flex align-center justify-center ma-6">
            <Loader size="56px" />
        </div>
    </Modal>
</template>

<script setup lang="ts">
definePageMeta({
    scrollToTop: false,
});

const appConfig = useAppConfig();
const router = useRouter();
const { open } = useModalPage();

const { t } = useI18n();
const route = useRoute();
const id = computed(() => route.params.id as string);

const basketStore = useBasketStore();
const authStore = useAuthStore();

const { data: pkg, error } = useAsyncData(() => getPackage(id.value));

if (error.value) {
    showError({ message: t("error.page_not_found"), statusCode: 404 });
}

// Ensure the user is logged in and has a basket first!
if (!authStore.isAuthenticated) {
    await router.push(authStore.getLoginRoute(`/package/${id.value}/gift`));
}

const targetUsernameId = ref("");

const isSubmitting = ref(false);
const submit = async (packageId: number, targetUsernameId: string) => {
    isSubmitting.value = true;

    // Does this package require variables to be set?
    if (pkg.value?.variables) {
        // Redirect to the variables page, add the targetUsernameId to the query
        router.push(
            `/package/${packageId}/variables?targetUsernameId=${targetUsernameId}`,
        );
        return;
    }

    try {
        await basketStore.giftPackage(packageId, targetUsernameId);

        open.value = false;
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<style scoped lang="scss">
@use "~/assets/styles/settings" as *;
</style>
