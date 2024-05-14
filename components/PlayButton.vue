<template>
    <UseClipboard
        v-if="appConfig.serverIp"
        v-slot="{ copy, copied }"
        :source="appConfig.serverIp"
    >
        <Button
            variant="secondary"
            @click="copy(appConfig.serverIp)"
            v-bind="$attrs"
        >
            {{ copied ? $t("buttons.copied") : $t("play") }}
        </Button>
    </UseClipboard>
</template>

<script setup lang="ts">
import { UseClipboard } from "@vueuse/components";

defineOptions({
    inheritAttrs: false,
});

const appConfig = useAppConfig();
</script>
