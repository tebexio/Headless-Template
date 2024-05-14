import type { RouterConfig } from "@nuxt/schema";

// https://router.vuejs.org/api/#routeroptions
export default <RouterConfig>{
    scrollBehavior: (to, from, savedPosition) => {
        const scollToTop =
            typeof to.meta?.scrollToTop === "function"
                ? to.meta.scrollToTop(to, from)
                : to.meta?.scrollToTop;

        if (to.params?.stop || scollToTop === false) {
            return;
        }

        if (to.hash) {
            const el = document.querySelector(to.hash);
            // vue-router does not incorporate scroll-margin-top on its own.
            if (el) {
                const top = parseFloat(getComputedStyle(el).scrollMarginTop);
                return {
                    el: to.hash,
                    behavior: "smooth",
                    top,
                };
            }

            return {
                el: to.hash,
                behavior: "smooth",
            };
        }

        // Scroll to top of window
        if (savedPosition) {
            return savedPosition;
        }
    },
};
