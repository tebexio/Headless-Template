<template>
    <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
    </Head>

    <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
        <Toast />
    </ClientOnly>
</template>

<script lang="ts" setup>
import "~/assets/styles/main.scss";
import { isClient } from "@vueuse/core";

const appConfig = useAppConfig();

useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk
            ? `${titleChunk} | ${appConfig.titlePrefix}`
            : appConfig.titlePrefix;
    },
});

const webstoreStore = useWebstoreStore();

const { data: webstore } = await useAsyncData("webstore", () =>
    webstoreStore.fetchWebstore(),
);

const { setNumberFormat, locale } = useI18n();

watchEffect(() => {
    if (!webstore.value) return;

    setNumberFormat(locale.value, {
        currency: {
            style: "currency",
            notation: "standard",
            currency: webstore.value?.currency ?? "USD",
        },
    });
});

const authStore = useAuthStore();
const toastStore = useToastStore();
const route = useRoute();
const router = useRouter();

if (route.query.success && isClient) {
    try {
        await authStore.loginCompleted();

        if (route.query.redirect) {
            await router.push(route.query.redirect as string);
        }

        toastStore.addToast("You have been successfully logged in.", {
            type: "success",
        });
    } catch (error) {
        toastStore.addToast(error as string, {
            type: "error",
        });
    }
}
</script>
