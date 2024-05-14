<template>
    <div class="field">
        <label :for="id">{{ label }}</label>
        <select
            :id="id"
            v-model="modelValue"
            v-bind="$attrs"
            class="dropdown"
            :name="name || id"
        >
            <option
                v-for="option of options"
                :value="option[valueKey]"
                :key="option[valueKey]"
            >
                {{ option.name }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
interface DropdownProps {
    id?: string;
    name?: string;
    label: string;
    options: any[];
    valueKey?: string;
    nameKey?: string;
}

withDefaults(defineProps<DropdownProps>(), {
    id: () => useId(),
    valueKey: "value",
    nameKey: "name",
});

const modelValue = defineModel();
</script>

<style scoped lang="scss">
@use "~/assets/styles/settings" as *;
@use "~/assets/styles/tools";

.dropdown {
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
        opacity: 0.5;
    }
}
</style>
