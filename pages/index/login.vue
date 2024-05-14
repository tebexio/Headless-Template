<template>
    <Modal
        v-model="open"
        @close="basketStore.clearPendingActions()"
        @hidden="router.push('/')"
    >
        <div class="auth">
            <template v-if="!authStore.isAuthenticated">
                <h5 class="mb-4">
                    {{
                        $t("auth.login.title", {
                            gameTypeName: appConfig.gameTypeName,
                        })
                    }}
                </h5>

                <Input
                    v-model="username"
                    type="text"
                    placeholder="Username"
                    @keyup.enter="onLogin"
                    class="mb-4"
                    :disabled="loading"
                />

                <div class="flex-grow-1"></div>

                <Button :loading="loading" @click="onLogin" variant="success">
                    {{ $t("buttons.login") }}
                </Button>
            </template>

            <template v-else>
                <h5>{{ $t("auth.logout.title") }}</h5>

                <div class="user my-4">
                    <Avatar :user="authStore.user" />
                    {{ authStore.user.username }}
                </div>

                <div class="flex-grow-1"></div>

                <Button @click="onLogout">
                    {{ $t("buttons.logout") }}
                </Button>
            </template>
        </div>
    </Modal>
</template>

<script setup lang="ts">
const { t } = useI18n();

useHead({
    title: t("titles.login"),
});

definePageMeta({
    scrollToTop: false,
});

const appConfig = useAppConfig();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const basketStore = useBasketStore();
const { open } = useModalPage();

const toastStore = useToastStore();

const username = ref<string | undefined>();
const loading = ref(false);

const onLogin = async () => {
    loading.value = true;

    if (username.value && username.value.length > 0) {
        try {
            await authStore.login(username.value);

            // Redirect to the previous page if there is a redirect query
            if (route.query.redirect) {
                await router.push(route.query.redirect as string);
            }

            open.value = false;
        } catch (error) {
            toastStore.addToast("Failed to login, please try again.", {
                type: "error",
            });
        }
    }

    loading.value = false;
};

const onLogout = () => {
    open.value = false;
    authStore.logout();
};
</script>

<style scoped lang="scss">
@use "~/assets/styles/settings" as *;
.auth {
    display: flex;
    flex-direction: column;
    height: 100%;

    .user {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding-block: 15px;
        border-radius: 5px;
        background-color: $tertiary;
    }
}
</style>
