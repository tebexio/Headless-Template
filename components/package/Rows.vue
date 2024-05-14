<template>
    <HeaderCard>
        <h3>{{ category.name }}</h3>
    </HeaderCard>

    <div class="row">
        <div class="col" v-for="pkg in category.packages" :key="pkg.id">
            <PackageCard :pkg="pkg" hide-options row />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { CategoryWithPackages } from "~/types";

interface StarterBundleProps {
    category: CategoryWithPackages;
}

defineProps<StarterBundleProps>();
</script>
