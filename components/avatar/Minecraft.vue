<template>
    <AvatarBase :width="width" :height="height">
        <img :src="src" :width="width * 0.8" alt="User avatar" />
    </AvatarBase>
</template>

<script setup lang="ts">
interface MinecraftAvatarProps {
    username?: string;
    width?: number;
    height?: number;
}

const props = withDefaults(defineProps<MinecraftAvatarProps>(), {
    width: 30,
    height: 30,
});

const img = useImage();

const loggedOutAvatar = computed(() => {
    const url = img("https://mc-heads.net/body/MHF_steve/128", {
        width: props.width * 0.8,
    });

    return url;
});

const loggedInAvatar = computed(() => {
    const url = img(`https://mc-heads.net/body/${props.username}/128`, {
        width: props.width * 0.8,
    });

    return url;
});

const src = computed(() => {
    return props.username ? loggedInAvatar.value : loggedOutAvatar.value;
});
</script>

<style lang="scss" scoped>
.avatar {
    position: relative;
    border-radius: 50%;
    overflow: hidden;

    img {
        margin-top: 3px;
        width: 24px;
        margin: 0 auto;
    }
}
</style>
