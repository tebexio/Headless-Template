<template>
    <Modal
        v-model="open"
        @close="basketStore.clearPendingActions()"
        @hidden="router.push('/')"
    >
        <div class="auth">
            <template v-if="authStore.isAuthenticated">
                <div class="user my-4">
                    <Avatar :user="authStore.user"></Avatar>
                    {{ authStore.user.username }}
                </div>

                <div class="flex-grow-1"></div>

                <Button @click="logout">
                    {{ $t("buttons.logout") }}
                </Button>
            </template>

            <template v-else>
                <h5>{{ $t("auth.login_redirect.title") }}</h5>

                <div
                    v-for="method in methods"
                    :key="method.name"
                    class="auth__method mt-6"
                >
                    <Button
                        :loading="isLoading"
                        block
                        @click="loginRedirect(method)"
                    >
                        {{ $t("auth.login_redirect.method", method) }}
                    </Button>
                </div>
            </template>
        </div>
    </Modal>
</template>

<script lang="ts" setup>
import { isClient } from "@vueuse/core";
import type { BasketAuthMethod } from "~/types";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const basketStore = useBasketStore();
const { open } = useModalPage();

const methods = ref<BasketAuthMethod[]>([]);

if (isClient) {
    const data = await authStore.getAuthMethods(route.query.redirect as string);

    if (data) {
        methods.value = data;
    }
}

const isLoading = ref(false);

const loginRedirect = (method: BasketAuthMethod) => {
    isLoading.value = true;

    // Redirect the user away for authentication
    authStore.loginRedirect(method);
};

const logout = () => {
    authStore.logout();
    open.value = false;
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
