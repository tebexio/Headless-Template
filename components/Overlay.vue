<template>
    <Teleport v-if="isMounted" :to="target">
        <div class="overlay">
            <Transition name="fade">
                <div
                    v-if="isActive"
                    class="overlay__scrim"
                    @click="isActive = false"
                ></div>
            </Transition>

            <Transition
                :name="transition"
                @after-enter="emit('show')"
                @after-leave="emit('hide')"
            >
                <div v-if="isActive" class="overlay__content" v-bind="$attrs">
                    <slot></slot>
                </div>
            </Transition>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
interface OverlayProps {
    transition?: "fade" | "slide-left" | "slide-right";
}

defineOptions({
    inheritAttrs: false,
});

withDefaults(defineProps<OverlayProps>(), {
    transition: "fade",
});

const emit = defineEmits(["show", "hide"]);
const { target } = useTeleport();
const isActive = defineModel();

const isMounted = shallowRef(false);
if (IN_BROWSER) {
    onMounted(() => {
        isMounted.value = true;
    });
}
</script>

<style lang="scss">
@use "sass:map";
@use "~/assets/styles/settings" as *;

.overlay-container {
    contain: layout;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    display: contents;
}

.overlay {
    border-radius: inherit;
    display: flex;
    left: 0;
    pointer-events: none;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: map-get($z-index, "overlay");

    &__content {
        outline: none;
        position: absolute;
        pointer-events: auto;
        contain: layout;
    }

    &__scrim {
        pointer-events: auto;
        border-radius: inherit;
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.7);
    }
}
</style>
