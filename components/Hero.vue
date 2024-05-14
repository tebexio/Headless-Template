<template>
    <div class="hero">
        <div class="hero__background">
            <NuxtImg
                class="hero__image"
                :src="image"
                :alt="title"
                loading="lazy"
            />
        </div>
        <div class="hero__title">
            <h1>{{ title }}</h1>
            <div>{{ subtitle }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface HeroProps {
    title: string;
    subtitle: string;
    image: string;
}

defineProps<HeroProps>();
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;

.hero {
    position: relative;
    width: 100%;
    height: $hero-banner-height;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: $hero-banner-border-radius;
    overflow: hidden;

    @if ($hero-gradient) {
        &::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: $hero-gradient;
            z-index: 1;
        }
    }

    &__title {
        h1 {
            color: inherit;
        }
        color: $hero-banner-color;
        position: relative;
        z-index: 2;
    }

    &__background {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: $hero-background-opacity;
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
