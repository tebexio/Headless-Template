<template>
    <AvatarBase :width="width" :height="height">
        <img
            v-if="username"
            :src="loggedInAvatar"
            :width="width"
            alt="User avatar"
        />

        <Icon v-else name="user" :size="width + 'px'" />
    </AvatarBase>
</template>

<script setup lang="ts">
interface SteamAvatarProps {
    username?: string;
    userId?: string;
    width?: number;
    height?: number;
}

const props = withDefaults(defineProps<SteamAvatarProps>(), {
    width: 30,
    height: 30,
});

const img = useImage();

const loggedInAvatar = computed(() => {
    // URL for the Steam avatar
    const url = img(userMeta.value.avatar, {
        width: props.width,
    });

    return url;
});

const webStoreStore = useWebstoreStore();
const userMeta = ref({ avatar: "" });

onMounted(async () => {
    if (
        props.username &&
        webStoreStore.webstore &&
        userMeta.value.avatar === ""
    ) {
        const { meta } = await gameUsernameToId(
            props.username,
            webStoreStore.webstore.platform_type_id,
        );

        userMeta.value = meta as { avatar: string };
    }
});
</script>
