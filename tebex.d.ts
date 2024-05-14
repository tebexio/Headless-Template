interface TebexCheckoutThemeColor {
    name: string;
    color: string;
}

const TebexCheckoutEvents = {
    CLOSE: "close",
    OPEN: "open",
    PAYMENT_COMPLETE: "payment_complete",
    PAYMENT_ERROR: "payment_error",
} as const;

interface TebexCheckoutConfig {
    ident: string;
    theme: "light" | "dark";
    colors?: TebexCheckoutThemeColor[];
}

interface TebexCheckout {
    init: (config: TebexCheckoutConfig) => void;
    on: (
        event: (typeof TebexCheckoutEvents)[keyof typeof TebexCheckoutEvents],
        callback: () => void,
    ) => void;
    launch: () => void;
}

interface Tebex {
    events: TebexCheckoutEvents;
    checkout: TebexCheckout;
}

interface Window {
    Tebex: Tebex;
}
