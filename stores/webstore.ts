import type { Webstore } from "~/types";
import * as services from "~/services";

export const useWebstoreStore = defineStore("webstore", () => {
    const webstore = ref<Webstore | null>(null);

    const fetchWebstore = async () => {
        const data = await services.getWebstore();

        webstore.value = data;

        return data;
    };

    // Check if the webstore requires external authentication
    const requiresExternalAuth = computed(() => {
        console.log(webstore.value?.platform_type);
        return webstore.value?.platform_type.includes("Minecraft");
    });

    return {
        webstore,
        requiresExternalAuth,
        fetchWebstore,
    };
});
