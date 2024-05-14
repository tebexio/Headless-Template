const BASE_URL = "https://ident.tebex.io";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    return await $fetch(event.context.params!.path, {
        baseURL: BASE_URL,
        params: {
            ...query,
        },
        headers: {
            Accept: "application/json",
        },
    });
});
