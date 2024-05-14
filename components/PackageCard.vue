<template>
    <div :class="classes" :style="style">
        <div class="package-card__inner">
            <div
                class="package-card__image"
                @click="$router.push(`/package/${pkg.id}`)"
            >
                <NuxtImg
                    v-if="pkg.image"
                    :src="pkg.image"
                    alt="Package image"
                    width="220px"
                    loading="lazy"
                />
            </div>

            <div
                class="package-card__details"
                @click="$router.push(`/package/${pkg.id}`)"
            >
                <div class="package-card__meta">
                    <h5>{{ pkg.name }}</h5>
                    <h6>
                        {{
                            $n(
                                mapQuantityToPackage(quantity ?? 1).base_price,
                                "currency",
                            )
                        }}
                    </h6>
                    <slot>
                        <p
                            v-if="showDescription && pkg.description"
                            v-html="pkg.description"
                        ></p>
                    </slot>
                </div>
            </div>

            <ClientOnly>
                <PackageActions
                    v-model:quantity="quantity"
                    :hide-options="!!hideOptions"
                    :hide-gift-button="pkg.disable_gifting"
                    :stacked="!!actionsStacked"
                    @add-to-cart="action('addToCart', $event)"
                    @gift="action('gift')"
                    :loading="loadingAction"
                />
            </ClientOnly>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Package } from "~/types";

interface PackageCardProps {
    pkg: Package;
    /**
     * A map of package id to quantity
     */
    quantityMap?: Record<number, Package>;
    showDescription?: boolean;
    hideOptions?: boolean;
    actionsStacked?: boolean;
    row?: boolean;
    width?: string;
}

const props = withDefaults(defineProps<PackageCardProps>(), {
    showDescription: false,
});
const slots = defineSlots();
const emit = defineEmits(["addToCart"]);

const basketStore = useBasketStore();
const router = useRouter();

const classes = computed(() => ({
    "package-card": true,
    "package-card--details":
        props.showDescription && (!!props.pkg.description || !!slots.default),
    "package-card--row": props.row,
}));

const style = computed(() => ({
    width: props.width,
}));

const loadingAction = reactive<Record<string, boolean>>({
    addToCart: false,
    gift: false,
});

const setLoading = (key: string, value: boolean) => {
    loadingAction[key] = value;

    // If after some time the action is still loading, set it to false
    setTimeout(() => {
        if (loadingAction[key]) {
            loadingAction[key] = false;
        }
    }, 3000);
};

/**
 * Maps the quantity to the package id, if you have a quantity map.
 * This allows you to have multiple packages with different quantities and prices
 */
const mapQuantityToPackage = (quantity: number): Package => {
    if (typeof props.quantityMap === "undefined") {
        return props.pkg;
    }

    return props.quantityMap[quantity] ?? props.pkg;
};

// Emits the action event for the package
const action = async (key: "gift" | "addToCart", value?: number) => {
    setLoading(key, true);

    if (key === "addToCart" && value) {
        let quantity = value;

        const pkg = mapQuantityToPackage(quantity);

        if (pkg.id !== props.pkg.id) {
            quantity = 1;
        }

        await basketStore.addPackageToBasket(pkg.id, quantity);

        emit("addToCart", quantity);
    } else if (key === "gift" && !props.pkg.disable_gifting) {
        await router.push(`/package/${props.pkg.id}/gift`);
    }

    setLoading(key, false);
};

const quantity = ref<number>(1);
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;
@use "~/assets/styles/tools";

.package-card {
    $self: &;

    display: flex;
    height: 100%;
    width: 100%;
    cursor: pointer;

    &__inner {
        display: flex;
        flex-direction: column;
        background-color: $package-card-bg;
        padding: $package-card-padding;
        border-radius: $package-card-border-radius;
        box-shadow: $package-card-box-shadow;
        position: relative;
        gap: 20px;
        width: 100%;
    }

    .package-actions {
        margin-top: auto;
    }

    &__meta {
        width: 100%;
        h5 {
            color: $package-card-name-color;
            font-weight: $package-card-name-font-weight;
            margin-bottom: 6px;
        }

        h6 {
            font-size: $package-card-price-font-size;
            font-weight: 700;
            color: $package-card-price-color;
        }

        text-align: $package-card-meta-text-align;
    }

    &__image {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 32px;
        flex-grow: 1;
        background: $package-card-image-bg;
    }

    &__details {
        display: flex;
        flex-direction: column;
        padding: $package-card-details-padding;
    }

    &--details {
        margin-top: 0;
        padding-inline: 0;
        cursor: initial;

        #{$self}__inner {
            box-shadow: none;
        }

        #{$self}__image {
            position: relative;
            top: 0;
            background-color: transparent;
        }

        #{$self}__details {
            align-items: center;
            flex-direction: column;

            @include tools.media-breakpoint-up("sm") {
                flex-direction: row;
            }
            margin-bottom: 30px;
            gap: 20px;
        }

        #{$self}__meta {
            text-align: left;

            h5 {
                margin-bottom: 20px;
            }
        }
    }

    &--row {
        // Only apply styles for large screens
        @include tools.media-breakpoint-up("lg") {
            padding-top: 0;

            #{$self}__inner {
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                gap: 20px;
                padding: 20px 40px;
                justify-content: space-between;
                width: 100%;
            }

            #{$self}__image {
                position: relative;
                top: 0;
                flex: 1 1 0;
                margin-right: 40px;
                min-width: 85px;
            }

            #{$self}__meta {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 20px;
            }

            .package-actions {
                min-width: 372px;
                margin-top: 0;
            }
        }
    }
}
</style>
