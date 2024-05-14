<template>
    <span class="loader" :style="style"></span>
</template>

<script setup lang="ts">
interface LoaderProps {
    size?: number | string;
}

const props = defineProps<LoaderProps>();

const size = computed(() => {
    if (typeof props.size === "number") {
        return props.size;
    }

    if (typeof props.size === "string") {
        return parseInt(props.size.split("px")[0], 10);
    }

    return 24;
});

const style = computed(() => ({
    width: `${size.value}px`,
    height: `${size.value}px`,
    borderWidth: `${size.value / 12}px`,
}));
</script>

<style scoped lang="scss">
@use "~/assets/styles/settings" as *;

.loader {
    width: $loader-default-size;
    height: $loader-default-size;
    border: $loader-thickness solid $loader-color;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 350ms linear infinite;
    aspect-ratio: 1 / 1;
}
</style>
