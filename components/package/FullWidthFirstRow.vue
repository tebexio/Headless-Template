<template>
    <HeaderCard>
        <h3>{{ category.name }}</h3>
    </HeaderCard>

    <div class="row justify-center">
        <div
            :class="{
                col: true,
                'col-12': index === 0,
                'col-md-4 col-lg-3': index > 0,
            }"
            v-for="(pkg, index) in orderedPackages"
            :key="pkg.id"
        >
            <PackageCard :pkg="pkg" :row="index === 0" hide-options />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { CategoryWithPackages } from "~/types";

interface ManticoreGearProps {
    firstPackageName?: string;
    category: CategoryWithPackages;
}

const props = defineProps<ManticoreGearProps>();
const orderedPackages = computed(() => {
    return props.category.packages.toSorted((a) => {
        if (a.name === props.firstPackageName) {
            return -1;
        }

        return 1;
    });
});
</script>
