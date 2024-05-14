import { IN_BROWSER } from "~/utils/globals";

const TELEPORT_CONTAINER_CLASS_NAME = "overlay-container";

export const useTeleport = () => {
    const target = computed(() => {
        if (!IN_BROWSER) return undefined;

        const targetElement = document.body;

        let container = targetElement.querySelector(
            `:scope > .${TELEPORT_CONTAINER_CLASS_NAME}`,
        );

        // Re-use existing container if it already exists
        if (!container) {
            container = document.createElement("div");
            container.className = TELEPORT_CONTAINER_CLASS_NAME;
            targetElement.appendChild(container);
        }

        return container;
    });

    return {
        target,
    };
};
