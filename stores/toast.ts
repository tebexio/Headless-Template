import { defineStore, skipHydrate } from "pinia";
import { reactive, watch } from "vue";

interface ToastOptions {
    type?: "success" | "error" | "info" | "warning";
    // -1 means the toast will not disappear
    timeout?: number;
}

interface Toast {
    id: string;
    title?: string;
    message: string;
    show: boolean;
    options: ToastOptions;
}

interface State {
    toasts: Toast[];
    addToast: (message: string, options: ToastOptions, title?: string) => void;
    removeToast: (toast: Toast) => void;
}

let id = 0;

export const useToastStore = defineStore("toast", function (): State {
    const toasts: Toast[] = reactive([]);

    watch(toasts, (toasts) => {
        toasts.forEach((toast) => {
            if (toast.options.timeout !== -1) {
                setTimeout(() => {
                    toast.show = false;

                    // Wait until the animation has finished
                    setTimeout(() => {
                        removeToast(toast);
                    }, 500);
                }, toast.options.timeout);
            }
        });
    });

    function addToast(message: string, options: ToastOptions, title?: string) {
        const _options: ToastOptions = {
            timeout: 5000,
            type: "success",
            ...options,
        };

        toasts.push({
            id: `toast-${id++}`,
            message,
            title,
            show: true,
            options: _options,
        });
    }

    function removeToast(toast: Toast) {
        const index = toasts.findIndex((t) => t.id === toast.id);

        if (index > -1) {
            toasts.splice(index, 1);
        }
    }

    return {
        toasts: skipHydrate(toasts),
        addToast,
        removeToast,
    };
});
