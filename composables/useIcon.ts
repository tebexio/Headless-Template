import type { Component } from "vue";

const svgs = import.meta.glob<Component>("~/assets/icons/*.svg", {
    // See https://vitejs.dev/guide/features.html#glob-import
    eager: true,
    import: "default",
});

const icons: any = {};

Object.entries(svgs).forEach(async ([path, module]) => {
    const iconName = path
        .toLowerCase()
        .replace("/assets/icons/", "")
        .replace(".svg", "");

    icons[iconName] = module;
});

export const useIcon = () => {
    return {
        getIcon(name: string): Component {
            return icons[name];
        },
    };
};
