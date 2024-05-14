export const useUIStore = defineStore("ui", () => {
    const showOverlay = computed(() => overlayedItems.value.length > 0);

    const overlayedItems = ref<string[]>([]);

    return {
        showOverlay,
        toggleItem(item: string, value?: boolean) {
            const show = value || !overlayedItems.value.includes(item);
            if (show) {
                overlayedItems.value = [...overlayedItems.value, item];
            } else {
                overlayedItems.value = overlayedItems.value.filter(
                    (i) => i !== item,
                );
            }
        },
        isItemActive(item: string) {
            return overlayedItems.value.includes(item);
        },
        hideAll() {
            overlayedItems.value = [];
        },
    };
});
