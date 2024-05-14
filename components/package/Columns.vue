<template>
    <HeaderCard>
        <h3>{{ category.name }}</h3>
    </HeaderCard>

    <div class="row ustify-center">
        <div
            class="col-12 col-md-4 col-lg"
            v-for="pkg in category.packages"
            :key="pkg.id"
        >
            <PackageCard
                :pkg="pkg"
                hide-options
                :actions-stacked="actionsStacked"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CategoryWithPackages } from "~/types";

interface RankProps {
    actionsStacked?: boolean;
    category: CategoryWithPackages;
}

withDefaults(defineProps<RankProps>(), {
    actionsStacked: true,
});
</script>
