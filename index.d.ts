declare module "nuxt/schema" {
    interface AppConfig {
        // Name of the store
        storeName: string;
        // ID of the store
        storeId: number;
        // URL of main site
        mainSiteUrl: string;
        // Discord invite URL
        discordUrl: string;
        // Game server IP/Hostname for the store (used for copy IP button)
        serverIp: string;
        // Prefix for the <title> tag
        titlePrefix: string;
        // Show confetting on payment complete
        confetti: boolean;
        // Show cart when item added?
        showCartOnAdd: boolean;
        // Authentication enabled?
        auth: boolean;
        // Auth external?
        authExternal: boolean;
    }
}

// It is always important to ensure you import/export something when augmenting a type
export {};
