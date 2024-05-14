export const useModalPage = (openOnMount: boolean = true) => {
    const open = ref(false);

    if (openOnMount) {
        onMounted(() => {
            // Wait for the modal to be mounted before opening it
            nextTick(() => {
                open.value = true;
            });
        });
    }

    return {
        open,
    };
};
