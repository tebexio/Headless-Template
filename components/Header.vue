<template>
    <div class="header" :style="{ height }">
        <div :class="classes" ref="header">
            <nav
                :class="{
                    'd-flex': true,
                    container: isSticky,
                    'pa-3': !isSticky,
                    'pa-0': isSticky,
                }"
            >
                <div class="col d-flex align-center ga-4">
                    <Button
                        tag="a"
                        :href="appConfig.mainSiteUrl"
                        icon="home"
                        variant="clear"
                        :aria-label="$t('buttons.home')"
                    ></Button>

                    <Button
                        v-if="categories && categories.length > 3"
                        icon="menu"
                        @click="uiStore.toggleItem('menu-sidebar')"
                        variant="clear"
                        :aria-label="$t('buttons.menu')"
                    ></Button>

                    <PlayButton class="d-none d-lg-inline-flex" />
                </div>
                <div class="col d-flex align-center">
                    <NuxtImg
                        preload
                        class="header__logo d-none d-md-block"
                        src="/logo.svg"
                        :alt="$t('store_name')"
                    />

                    <Button
                        variant="clear"
                        class="header__logo-icon d-md-none mx-auto"
                        @click="scrollToTop"
                        :aria-label="$t('buttons.go_to_top')"
                    >
                        <NuxtImg
                            src="/logo-icon.svg"
                            :alt="$t('store_name')"
                            width="16"
                        />
                    </Button>
                </div>
                <div class="col d-flex justify-end align-center ga-4">
                    <ClientOnly>
                        <Button
                            class="d-none d-sm-inline-flex login-btn"
                            variant="primary"
                            :to="authStore.loginRoute"
                            ref="loginButton"
                        >
                            <template #prepend>
                                <Avatar :user="authStore.user" />
                            </template>

                            <template #default>
                                <span
                                    class="text-center"
                                    ref="username"
                                    :style="{ minWidth: usernameWidth }"
                                >
                                    {{
                                        authStore.isAuthenticated
                                            ? isHovered
                                                ? $t("buttons.logout")
                                                : authStore.user.username
                                            : $t("buttons.login")
                                    }}
                                </span>
                            </template>
                        </Button>
                    </ClientOnly>
                    <Button
                        class="d-none d-sm-inline-flex"
                        variant="success"
                        prependIcon="cart"
                        @click="uiStore.toggleItem('cart-sidebar')"
                    >
                        <ClientOnly :fallback="t('buttons.cart')">
                            {{
                                t(
                                    "buttons.cart",
                                    basketStore.basket?.packages?.length ?? 0,
                                )
                            }}
                        </ClientOnly>
                    </Button>

                    <!-- Mobile buttons -->
                    <ClientOnly>
                        <Button
                            class="d-inline-flex d-sm-none btn--icon"
                            variant="primary"
                            :to="authStore.loginRoute"
                            :aria-label="
                                authStore.isAuthenticated
                                    ? isHovered
                                        ? $t('buttons.logout')
                                        : authStore.user.username
                                    : $t('buttons.login')
                            "
                        >
                            <Avatar :user="authStore.user" />
                        </Button>
                    </ClientOnly>

                    <Button
                        class="d-inline-flex d-sm-none"
                        variant="success"
                        icon="cart"
                        @click="uiStore.toggleItem('cart-sidebar')"
                        :aria-label="
                            $t(
                                'buttons.cart',
                                basketStore.basket?.packages?.length ?? 0,
                            )
                        "
                    >
                    </Button>
                </div>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
const uiStore = useUIStore();
const authStore = useAuthStore();
const basketStore = useBasketStore();
const { t } = useI18n();

const loginButton = ref();
const username = ref();
const isHovered = useElementHover(loginButton);

const usernameWidth = computed(() => {
    return `${username.value?.offsetWidth ?? 0}px`;
});

const appConfig = useAppConfig();

const isSticky = ref(false);
const { y } = useWindowScroll();

watch(
    () => y.value,
    () => {
        if (y.value > 60) {
            isSticky.value = true;
        } else {
            isSticky.value = false;
        }
    },
);

const height = ref<string | undefined>();
const header = ref<HTMLDivElement | null>(null);

useResizeObserver(header, (entries) => {
    const entry = entries[0];
    height.value = `${entry.contentRect.height}px`;
});

onMounted(() => {
    height.value = header.value?.offsetHeight + "px";
});

const classes = computed(() => {
    return {
        header__container: true,
        "pa-0": true,
        "header__container--sticky": isSticky.value,
        container: !isSticky.value,
        "container-fluid": isSticky.value,
    };
});

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

const categoryStore = useCategoryStore();
const { data: categories } = await useAsyncData("categories", () => {
    return categoryStore.fetchCategories();
});
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;
@use "sass:map";

.header {
    $self: &;
    background-color: $header-bg;

    width: 100%;

    img {
        max-width: 120px;
        margin: 0 auto;
    }

    &__container {
        &--sticky {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: map-get($z-index, "header");
            background-color: $header-sticky-bg;

            #{$self}__logo {
                display: none !important;

                &-icon {
                    display: block !important;
                }
            }
        }
    }
}
</style>
