<template>
    <div class="row row--dense">
        <div class="col">
            <div class="header-card">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;

.header-card {
    display: flex;
    align-items: center;
    justify-content: $header-card-justify-content;
    min-height: $header-card-height;
    width: 100%;
    border-radius: $header-card-border-radius;
    background-color: $header-card-bg;
    color: $header-card-color;
}
</style>
