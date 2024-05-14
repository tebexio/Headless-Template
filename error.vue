<template>
    <div
        class="error d-flex flex-column justify-center align-center w-100 ga-5"
    >
        <h1>{{ error?.statusCode }}</h1>
        <p>{{ error?.statusMessage }}</p>
        <Button @click="handleError">Go back</Button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    error: Object,
});

console.log(props.error);

function handleError() {
    clearError({ redirect: "/" });
}
</script>

<style scoped lang="scss">
.error {
    height: 100vh;
}
</style>
