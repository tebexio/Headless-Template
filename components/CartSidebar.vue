<template>
    <Sidebar v-model="isActive">
        <template #header>
            <Button
                class="cart__close"
                variant="clear"
                @click="uiStore.toggleItem('cart-sidebar')"
                icon="close"
            ></Button>

            <h4 class="cart__title">
                {{ $t("cart.title") }}
            </h4>
        </template>

        <Cart
            :items="basketStore.basket?.packages ?? []"
            :items-loading="basketStore.packagesLoading"
            @remove="basketStore.removePackageFromBasket($event)"
        />

        <template #actions>
            <div
                v-if="basketStore.basket?.total_price"
                class="cart__total d-flex justify-space-between my-6"
            >
                <span>{{ $t("cart.total") }}</span>
                <span>
                    {{ $n(basketStore.basket.total_price, "currency") }}
                </span>
            </div>

            <Button
                :disabled="
                    !basketStore.basket?.ident ||
                    basketStore.basket.packages.length === 0
                "
                @click="checkout"
                block
                variant="success"
            >
                {{ $t("buttons.checkout") }}
            </Button>
        </template>
    </Sidebar>
</template>

<script setup lang="ts">
import { isClient } from "@vueuse/core";
import confetti from "canvas-confetti";
import { defu } from "defu";

const basketStore = useBasketStore();
const uiStore = useUIStore();
const toastStore = useToastStore();
const authStore = useAuthStore();

const isActive = computed({
    get() {
        return uiStore.isItemActive("cart-sidebar");
    },
    set(value) {
        uiStore.toggleItem("cart-sidebar", value);
    },
});

const { t } = useI18n();
const appConfig = useAppConfig();

const celerate = () => {
    // do this for 300 miliseconds
    const duration = 300;
    const end = Date.now() + duration;

    (function frame() {
        // launch a few confetti from the left edge
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
        });
        // and launch a few from the right edge
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
        });

        // keep going until we are out of time
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
};

const onPaymentComplete = () => {
    toastStore.addToast(
        t("checkout.completed.subtitle"),
        {
            type: "success",
        },
        t("checkout.completed.title"),
    );

    if (appConfig.confetti) {
        // It's party time! 🎉
        celerate();
    }

    // Log the user out
    authStore.logout();
};

onMounted(async () => {
    await until(() => window?.Tebex).toBeTruthy();

    basketStore.getBasket();

    if (isClient) {
        window.Tebex.checkout.on("payment_complete", onPaymentComplete);

        window.Tebex.checkout.on("close", () => {
            // Refresh the basket
            if (basketStore.basket?.ident) {
                basketStore.getBasket();
            }
        });
    }
});

const checkout = async () => {
    if (!basketStore.basket?.ident) {
        return;
    }

    uiStore.toggleItem("cart-sidebar");

    const config = defu<TebexCheckoutConfig, [{ ident: string }]>(
        appConfig.tebexJsConfig,
        {
            ident: basketStore.basket?.ident,
        },
    );

    if (isClient) {
        window.Tebex.checkout.init(config);

        window.Tebex.checkout.launch();
    }
};

if (appConfig.showCartOnAdd) {
    watch(
        () => basketStore.packages,
        (newValue, oldValue) => {
            if (newValue.size > oldValue.size) {
                isActive.value = true;
            }
        },
    );
}
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;

.cart__title {
    margin-inline: auto;
    font-weight: bold;
    color: $c-800;
}

.cart__close {
    position: absolute;
    color: $c-800;
}

.cart__total {
    font-size: 1.5rem;
}
</style>
