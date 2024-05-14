import { isClient } from "@vueuse/core";

interface IdentError {
    code: string;
    message: string;
}

export function useIdentApi<T = unknown>(
    url: string,
    userOptions = {},
    showToast: boolean = true,
) {
    const toastStore = useToastStore();
    // Proxy requests through nitro server
    const baseURL = "/api/ident";

    return $fetch<T>(url, {
        baseURL,

        onResponse({ response }) {
            const hasError =
                !response.status.toString().startsWith("2") ||
                response.status.toString() === "204" || // No content
                !!response._data.error;

            if (hasError) {
                const error = response._data.error as IdentError;

                if (isClient && showToast) {
                    toastStore.addToast(`${error.message}`, {
                        type: "error",
                        timeout: 10000,
                    });
                }

                throw new Error(error.message);
            }
        },

        ...userOptions,
    });
}
