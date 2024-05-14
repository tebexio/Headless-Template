<template>
    <HeaderCard>
        <h3>{{ category.name }}</h3>
    </HeaderCard>

    <div class="row">
        <div class="col" v-for="pkg in groupedPackages" :key="pkg.id">
            <PackageCard
                :pkg="pkg"
                :quantity-map="quantityMap[pkg.name]"
                :row="row"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { CategoryWithPackages, Package } from "~/types";

interface GemstonesProps {
    category: CategoryWithPackages;
    row?: boolean;
}

const props = defineProps<GemstonesProps>();

const groupedPackages = reactive<Record<string, Package>>({});
const quantityMap = reactive<Record<string, Record<number, Package>>>({});

watchEffect(() => {
    props.category.packages.forEach((curr) => {
        const packageName = curr.name.replace(/\d+x+\s/g, "");
        const [quantity] = Array.from(
            curr.name.matchAll(/(\d+)x+/g),
            (m) => m[1],
        );

        // Update grouped packages
        if (!groupedPackages[packageName]) {
            groupedPackages[packageName] = { ...curr, name: packageName };
        }

        // Update quantity map
        if (!quantityMap[packageName]) {
            quantityMap[packageName] = {};
        }
        quantityMap[packageName][parseInt(quantity)] = curr;
    });
});
</script>
