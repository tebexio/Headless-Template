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
interface FiveMAvatarProps {
    username?: string;
    userId?: string;
    width?: number;
    height?: number;
}

const props = withDefaults(defineProps<FiveMAvatarProps>(), {
    width: 30,
    height: 30,
});

const img = useImage();

const loggedInAvatar = computed(() => {
    const url = img(
        `https://forum.cfx.re/user_avatar/forum.cfx.re/${props.username}/128/${props.userId}_2.png`,
        {
            width: props.width,
        },
    );

    return url;
});
</script>
