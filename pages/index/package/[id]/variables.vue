<template>
    <Modal v-model="open" @hidden="router.push('/')">
        <div v-if="pkg">
            <h5>{{ pkg.name }}</h5>

            <div v-for="variable in pkg.variables" :key="variable.id">
                <Dropdown
                    v-if="variable.type && variable.options"
                    :name="variable.identifier"
                    :label="variable.description"
                    v-model="variableData[variable.identifier]"
                    :options="variable.options"
                    valueKey="id"
                />
            </div>

            <Button
                :loading="isSubmitting"
                @click="submit(pkg.id, variableData)"
            >
                {{
                    targetUsernameId
                        ? $t("buttons.add_gift_to_cart")
                        : $t("buttons.add_to_cart")
                }}
            </Button>
        </div>

        <div v-else class="d-flex align-center justify-center ma-6">
            <Loader size="56px" />
        </div>
    </Modal>
</template>

<script setup lang="ts">
import type { PackageVariableData } from "~/types";

definePageMeta({
    scrollToTop: false,
});

const router = useRouter();
const { open } = useModalPage();

const { t } = useI18n();
const basketStore = useBasketStore();
const route = useRoute();
const id = computed(() => route.params.id as string);
const targetUsernameId = computed(() => route.query.targetUsernameId as string);

const { data: pkg, error } = useAsyncData(() => getPackage(id.value));

if (error.value) {
    showError({ message: t("error.page_not_found"), statusCode: 404 });
}

const variableData = reactive(
    pkg.value?.variables?.reduce((acc, variable) => {
        acc[variable.identifier] = null;

        return acc;
    }, {} as PackageVariableData) ?? {},
);

const isSubmitting = ref(false);
const submit = async (packageId: number, data: PackageVariableData) => {
    isSubmitting.value = true;

    try {
        if (targetUsernameId.value) {
            try {
                await basketStore.giftPackage(
                    packageId,
                    targetUsernameId.value,
                    variableData,
                );
            } catch (error) {
                console.log(error);
            }
        } else {
            await basketStore.addPackageToBasket(packageId, 1, data);
        }

        open.value = false;
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<style scoped lang="scss">
@use "~/assets/styles/settings" as *;
</style>
