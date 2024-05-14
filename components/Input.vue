<template>
    <div class="field">
        <label v-if="label" :for="id">{{ label }}</label>
        <input
            :id="id"
            :name="name || id"
            class="input"
            v-model="modelValue"
            :type="type"
            :placeholder="placeholder"
            :disabled="disabled"
            v-bind="$attrs"
        />
    </div>
</template>

<script setup lang="ts">
interface InputProps {
    label?: string;
    id?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
}

const modelValue = defineModel();

withDefaults(defineProps<InputProps>(), {
    id: () => useId(),
    type: "text",
    placeholder: "",
    disabled: false,
});
</script>

<style scoped lang="scss">
@use "~/assets/styles/settings" as *;
@use "~/assets/styles/tools";

.input {
    padding: $input-padding;
    border: $input-border;
    background-color: $input-bg;
    @include tools.text-contrast($input-bg);
    border-radius: $input-border-radius;
    width: 100%;
    font-size: $input-font-size;
    line-height: $input-line-height;
    background-clip: padding-box;
    transition: $input-transition;
    outline: none;

    &::placeholder {
        color: $input-placeholder-color;
    }

    &:hover,
    &:focus {
        border-color: $input-border-color-hover;
    }

    &:disabled {
        opacity: $input-disabled-opacity;
    }
}
</style>
