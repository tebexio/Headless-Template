<template>
    <div class="layout layout--default">
        <Header />

        <MenuSidebar />

        <CartSidebar />

        <div class="w-100 container--fluid">
            <slot />
        </div>

        <Footer />
    </div>
</template>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;

.layout {
    position: relative;
    &--default {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        min-height: 100vh;
    }
}
</style>
