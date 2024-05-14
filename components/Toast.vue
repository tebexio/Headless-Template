<template>
    <Teleport to="body">
        <div class="toast-container">
            <TransitionGroup name="toast-slide">
                <div
                    v-for="toast in toasts"
                    :key="toast.id"
                    class="toast"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    :class="`toast--${toast.options.type}`"
                >
                    <div class="toast__content">
                        <span class="toast__title" v-if="toast.title">
                            {{ toast.title }}
                        </span>
                        <span>{{ toast.message }}</span>
                    </div>

                    <Button
                        @click="toastStore.removeToast(toast)"
                        variant="clear"
                        icon="close"
                    ></Button>
                </div>
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
const toastStore = useToastStore();
const { toasts } = storeToRefs(toastStore);
</script>

<style scoped lang="scss">
@use "sass:map";
@use "~/assets/styles/settings" as *;
@use "~/assets/styles/tools";

.toast-container {
    position: fixed;
    width: 100%;
    height: 100%;
    pointer-events: none;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1rem;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: map-get($z-index, "toast");
}

.toast {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 350px;
    min-height: 48px;
    padding-left: 20px;
    gap: 10px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.85);
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    pointer-events: initial;
    white-space: pre-wrap;

    &__content {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    &__title {
        margin-top: 10px;
        font-size: 30px;

        & + span {
            margin-bottom: 10px;
        }
    }

    & + .toast {
        margin-top: 0.5rem;
    }

    &--success {
        background-color: $success;
        color: white;
    }

    &--error {
        background-color: $danger;
        @include tools.text-contrast($danger);
    }
}

.toast-slide-move,
.toast-slide-enter-active,
.toast-slide-leave-active {
    transition: all 0.25s ease;
}
.toast-slide-enter-from,
.toast-slide-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.toast-slide-active {
    position: absolute;
}
</style>
