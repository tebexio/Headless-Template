<template>
    <component
        v-bind="$attrs"
        :is="tag"
        :class="classes"
        @click="clicked"
        :disabled="disabled || loading"
        :to="to"
        :external="external"
    >
        <span v-if="prependIcon || $slots.prepend" class="btn__prepend">
            <slot name="prepend">
                <Icon v-if="prependIcon" :name="prependIcon" :size="iconSize" />
            </slot>
        </span>

        <span class="btn__content">
            <Loader v-if="loading"></Loader>
            <template v-else>
                <Icon v-if="icon" :name="icon" :size="iconSize" />
                <slot></slot>
            </template>
        </span>

        <span v-if="appendIcon || $slots.append" class="btn_append">
            <slot name="append">
                <Icon v-if="appendIcon" :name="appendIcon" :size="iconSize" />
            </slot>
        </span>
    </component>
</template>

<script setup lang="ts">
import type { NuxtLinkProps } from "#app";
import { NuxtLink } from "#components";
interface ButtonProps {
    variant?:
        | "primary"
        | "secondary"
        | "tertiary"
        | "links"
        | "success"
        | "clear";
    size?: "sm" | "md" | "lg";
    tag?: "button" | "input" | "a";
    to?: string | NuxtLinkProps["to"];
    external?: NuxtLinkProps["external"];
    disabled?: boolean;
    block?: boolean;
    loading?: boolean;
    icon?: string;
    iconSize?: string;
    prependIcon?: string;
    appendIcon?: string;
}

const props = withDefaults(defineProps<ButtonProps>(), {
    tag: "button",
    size: "md",
    variant: "primary",
    iconSize: "20px",
});

const classes = computed(() => [
    "btn",
    `btn--${props.variant}`,
    {
        [`btn--${props.size}`]: props.size,
        "btn--block": props.block,
        "btn--disabled": props.disabled,
        "btn--loading": props.loading,
        "btn--icon": !!props.icon,
    },
]);

const tag = computed(() => {
    if (props.to) {
        return NuxtLink;
    } else {
        return props.tag;
    }
});

const emit = defineEmits(["click"]);

const clicked = (event: Event) => {
    if (props.disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }
    emit("click", event);
};
</script>

<style lang="scss">
@use "sass:color";
@use "~/assets/styles/settings" as *;
@use "~/assets/styles/tools";

@mixin btn-shadow($color) {
    @if ($btn-box-shadow-enabled) {
        box-shadow: 0px -4px 0px 0px $color inset;
    }
}

.btn {
    $self: &;
    display: inline-grid;
    grid-template-areas: "prepend content append";
    grid-template-columns: max-content auto max-content;
    height: $btn-height-base;
    min-width: $btn-height-base;
    padding: 0 $btn-gap * 2;
    border: 0;
    color: #fff;
    font-weight: 400;
    border-radius: $btn-border-radius;
    cursor: pointer;
    @include btn-shadow(rgba(0, 0, 0, 0.1));
    justify-content: center;
    align-items: center;
    text-decoration: none;
    overflow: hidden;

    &__prepend,
    &__content,
    &__append {
        display: flex;
        align-items: center;
    }

    &__prepend {
        grid-area: prepend;
        margin-right: $btn-gap;
    }

    &__content {
        grid-area: content;
        justify-content: center;
        white-space: nowrap;
        font-weight: $btn-font-weight;
    }

    &__append {
        grid-area: append;
    }

    &:hover {
        box-shadow: none;
        text-decoration: none;
    }

    &--primary {
        background-color: $primary;
        @include tools.text-contrast($primary);

        &:hover {
            background-color: $primary-dark;
            @include tools.text-contrast($primary-dark);
        }
    }

    &--secondary {
        background-color: $secondary;
        @include tools.text-contrast($secondary);
        @include btn-shadow(color.change($secondary, $alpha: 0.5));

        &:hover {
            background-color: $secondary-dark;
            @include tools.text-contrast($secondary-dark);
        }
    }

    &--tertiary {
        background-color: $tertiary;
        @include tools.text-contrast($tertiary);
        @include btn-shadow(color.change($tertiary, $alpha: 0.2));

        &:hover {
            background-color: $tertiary-dark;
            @include tools.text-contrast($tertiary-dark);
        }
    }

    &--success {
        background-color: $success;
        color: white;

        &:hover {
            background-color: $success-dark;
            color: white;
        }
    }

    &--links {
        background-color: $links;
        @include tools.text-contrast($links);

        &:hover {
            background-color: $links-dark;
            @include tools.text-contrast($links-dark);
        }
    }

    &--clear {
        background-color: transparent;
        color: inherit;
        box-shadow: none;
    }

    &--sm {
        height: $btn-height-sm;
        min-width: $btn-height-sm;
    }

    &--lg {
        height: $btn-height-lg;
        min-width: $btn-height-lg;
    }

    &--disabled {
        opacity: $btn-disabled-opacity;
    }

    &--block {
        width: 100%;
    }

    &--loading {
        pointer-events: none;
    }

    &--icon {
        padding: 0;
    }
}
</style>
