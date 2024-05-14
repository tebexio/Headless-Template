// https://nuxt.com/docs/guide/directory-structure/app-config
// See index.d.ts for the full list of available options
export default defineAppConfig({
    // Shows in the <title> tag before the name of the page
    titlePrefix: "Example Store",
    // The name of your store
    storeName: "Example Store",
    // Require the user to login before they add items?
    auth: true,
    // Use external auth methods, e.g. CFX, Steam (Set to false for minecraft stores)
    authExternal: true,
    // The unique ID of the store
    storeId: 45295,
    // A link to your main site (optional)
    mainSiteUrl: "https://example.com",
    // A discord invite url (optional)
    discordUrl: "https://discord.gg/example",
    // A IP of your server which to display (optional)
    serverIp: "play.example.com",
    // Reveal the sidebar when an item is added to the cart?
    showCartOnAdd: true,
    // Show confetti after checkout?
    confetti: true,
    // Game type name to display on the store
    gameTypeName: "Minecraft",
    // Tebex.js settings see https://docs.tebex.io/developers/tebex.js/integration#config
    tebexJsConfig: {
        theme: "dark",
        colors: [
            {
                name: "primary",
                color: "#EB5526",
            },
            {
                name: "secondary",
                color: "#F5F5F5",
            },
        ],
    },
});
