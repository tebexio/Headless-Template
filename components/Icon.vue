<template>
    <component
        :is="getIcon(name)"
        :style="style"
        v-bind="dimensions"
        :font-controlled="fontControlled"
    />
</template>

<script setup lang="ts">
interface IconProps {
    name: string;
    size?: string;
    width?: string;
    height?: string;
    fontControlled?: boolean;
}

const props = withDefaults(defineProps<IconProps>(), {
    size: "20px",
    fontControlled: true,
});

const style = computed(() => ({
    fill: "currentColor",
}));

const dimensions = computed(() => {
    return {
        "font-size": props.size,
        width: props.width,
        height: props.height,
    };
});

const { getIcon } = useIcon();
</script>

<style lang="scss" scoped>
svg {
    color: inherit;
}
</style>
