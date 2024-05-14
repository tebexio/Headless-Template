import type { Package, MaybePackageWithVariables } from "~/types/package";

export const getAllPackages = () => useAPI<Package[]>("accounts", "/packages");

export const getPackage = (packageId: string) =>
    useAPI<MaybePackageWithVariables>("accounts", `/packages/${packageId}`);
