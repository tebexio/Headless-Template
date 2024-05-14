import { isClient } from "@vueuse/core";

interface ErrorType {
    detail: string;
    error_code: string;
    status: number;
    title: string;
}

export function useAPI<T = unknown>(
    route: string,
    url: string,
    userOptions = {},
    showToast: boolean = true,
) {
    const toastStore = useToastStore();
    const config = useRuntimeConfig();
    const baseURL = `${config.public.apiBaseUrl}/api/${route}/${route === "accounts" ? config.public.apiPublicKey : ""}`;

    return $fetch<T>(url, {
        baseURL,

        onResponse({ response }) {
            const hasError =
                !response.status.toString().startsWith("2") ||
                response._data.status === "error";

            if (hasError) {
                const error = response._data as ErrorType;

                if (isClient && showToast) {
                    toastStore.addToast(`${error.detail || error.title}`, {
                        type: "error",
                        timeout: 10000,
                    });
                }

                throw new Error(error.detail);
            }

            response._data = response._data.data ?? response._data;
        },

        ...userOptions,
    });
}
