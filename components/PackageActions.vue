<template>
    <div :class="classes">
        <div v-if="!hideOptions" class="package-actions__options">
            <Button
                v-for="opt of quantities"
                block
                size="sm"
                variant="tertiary"
                :key="opt"
                :disabled="selectedQuantity === opt"
                @click="selectedQuantity = opt"
            >
                {{ `${opt}x` }}
            </Button>
        </div>

        <div class="package-actions__buttons">
            <Button
                :loading="loading?.['addToCart']"
                :disabled="disabled"
                block
                @click="emit('addToCart', selectedQuantity ?? 1)"
            >
                {{ $t("buttons.add_to_cart") }}
            </Button>
            <Button
                v-if="!hideGiftButton"
                :loading="loading?.['gift']"
                :disabled="disabled"
                variant="secondary"
                @click="emit('gift')"
            >
                {{ $t("buttons.gift") }}
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
interface PackageActionProps {
    hideOptions: boolean;
    hideGiftButton: boolean;
    stacked: boolean;
    loading?: {
        [key: string]: boolean;
    };
    disabled?: boolean;
}

interface PackageActionEmits {
    (e: "addToCart", quantity: number): void;
    (e: "gift"): void;
}

const props = defineProps<PackageActionProps>();

const emit = defineEmits<PackageActionEmits>();

const classes = computed(() => {
    return {
        "package-actions": true,
        "package-actions--stacked": props.stacked,
    };
});

const selectedQuantity = defineModel<number | null>("quantity", {
    default: null,
});
const quantities = [1, 5, 10];
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;

.package-actions {
    $self: &;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: $package-card-actions-padding;

    &--stacked {
        #{$self}__buttons {
            flex-direction: column;
        }
    }

    &__buttons,
    &__options {
        display: flex;
        gap: 10px;
    }
}
</style>
