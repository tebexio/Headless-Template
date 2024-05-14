<template>
    <div class="cart-item">
        <div class="cart-item__image">
            <img :src="item.image" alt="Package Image" />
        </div>

        <div class="cart-item__content">
            <p class="cart-item__name">{{ item.name }}</p>
            <p>{{ $n(item.in_basket.price, "currency") }}</p>
            <p class="cart-item__gift-user" v-if="item.in_basket.gift_username">
                <i18n-t keypath="cart.item.gift_to" tag="span">
                    <template #username>
                        <span>{{ item.in_basket.gift_username }}</span>
                    </template>
                </i18n-t>
            </p>
        </div>

        <div class="cart-item__actions">
            <span class="cart-item__quantity">
                {{
                    $t("cart.item.quantity", {
                        quantity: item.in_basket.quantity,
                    })
                }}
            </span>

            <Button
                class="cart-item__remove"
                size="sm"
                @click="emit('remove', item.id)"
                :loading="loading"
                variant="clear"
                icon="remove"
            >
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PackageInBasket } from "~/types";

interface CartItemProps {
    item: PackageInBasket;
    loading: boolean;
}

defineProps<CartItemProps>();

const emit = defineEmits<{
    remove: [id: number];
}>();
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;
@use "~/assets/styles/tools";

.cart-item {
    display: flex;
    align-items: center;
    padding: 16px;
    width: 100%;
    border-bottom: $border-bottom;
    background-color: $cart-item-bg;
    border-radius: $cart-item-border-radius;
    @include tools.text-contrast($cart-item-bg);

    &__name {
        font-size: $cart-item-name-font-size;
        font-weight: $cart-item-name-font-weight;
        margin: 0;
    }

    &__image {
        width: $cart-item-image-size;
        height: $cart-item-image-size;
        border-radius: $cart-item-image-border-radius;
        overflow: hidden;
        margin-right: 16px;
        background-color: $cart-item-image-bg;
        padding: $cart-item-image-padding;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__content {
        flex-grow: 1;

        h4 {
            margin: 0 0 8px;
        }

        p:first-of-type {
            margin: 0;
        }
    }

    &__actions {
        display: flex;
        align-items: center;
    }

    &__quantity {
        color: $cart-item-quantity-color;
        font-size: 18px;
    }

    &__remove {
        color: $cart-item-delete-color;
    }

    &__gift-user {
        color: $cart-item-gift-user-color;
        font-size: $cart-item-gift-user-font-size;
        margin-top: $cart-item-gift-user-margin-top;

        & > span {
            font-weight: bold;

            & > span {
                font-weight: normal;
            }
        }
    }
}
</style>
