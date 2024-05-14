<template>
    <Overlay
        v-model="isActive"
        :transition="`slide-${position}`"
        :class="classes"
        ref="sidebar"
    >
        <div class="sidebar__header">
            <slot name="header"></slot>
        </div>

        <div class="sidebar__content">
            <slot></slot>
        </div>

        <div class="sidebar__actions">
            <slot name="actions"></slot>
        </div>
    </Overlay>
</template>

<script setup lang="ts">
interface SidebarProps {
    position?: "left" | "right";
}

const props = withDefaults(defineProps<SidebarProps>(), {
    position: "right",
});

const classes = computed(() => ({
    sidebar: true,
    "sidebar--left": props.position === "left",
    "sidebar--right": props.position === "right",
}));

const isActive = defineModel();

const sidebar = ref<HTMLElement | null>(null);
</script>

<style lang="scss">
@use "sass:map";
@use "~/assets/styles/settings" as *;
@use "~/assets/styles/tools";

.sidebar {
    &--left {
        left: 0;
    }

    &--right {
        right: 0;
    }

    width: 100%;
    height: 100vh;
    height: 100dvh;
    position: fixed;
    top: 0;
    background: $sidebar-bg;
    z-index: map-get($z-index, "sidebar");
    padding: 38px 0 56px;
    display: flex;
    flex-direction: column;

    @include tools.media-breakpoint-up("sm") {
        width: 420px;
    }

    &__header {
        display: flex;
        padding: 0 28px;
    }

    &__content {
        display: flex;
        flex-grow: 1;
        padding: 32px 0;
        overflow: auto;
    }

    &__actions {
        padding: 0 28px;
    }
}
</style>
