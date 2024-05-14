<template>
    <component
        :is="avatarComponent"
        :username="props.user?.username"
        :userId="props.user?.userId"
        :width="props.width"
        :height="props.height"
    ></component>
</template>

<script setup lang="ts">
import { AvatarFiveM, AvatarMinecraft, AvatarSteam } from "#components";
import type { Auth } from "~/types";

interface AvatarProps {
    user?: Auth;
    width?: number;
    height?: number;
}

const props = defineProps<AvatarProps>();

const webstoreStore = useWebstoreStore();
const { webstore } = storeToRefs(webstoreStore);

const avatarComponent = computed(() => {
    if (webstore.value?.platform_type === "FiveM") {
        return AvatarFiveM;
    }

    if (webstore.value?.platform_type.includes("Minecraft")) {
        return AvatarMinecraft;
    }

    // Default to Minecraft if no method is provided
    return AvatarSteam;
});
</script>
