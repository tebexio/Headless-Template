import type { Webstore } from "~/types";

export const getWebstore = () => useAPI<Webstore>("accounts", "");
