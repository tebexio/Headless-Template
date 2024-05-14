export default defineI18nConfig(() => ({
    legacy: false,
    locale: "en-US",
    numberFormats: {
        "en-US": {
            currency: {
                style: "currency",
                currency: "USD",
                notation: "standard",
            },
        },
    },
    messages: {
        "en-US": {
            store_name: "Example Store",
            play: "example.play.com",
            index: {
                hero: {
                    title: "Hero Banner",
                    subtitle: "CHECK OUT THE LATEST OFFERS",
                },
            },
            buttons: {
                checkout: "Proceed to Checkout",
                cart: "Cart | Cart ({n}) | Cart ({n})",
                add_to_cart: "Add to cart",
                add_gift_to_cart: "Add Gift to Cart",
                gift: "Gift",
                login: "Login",
                logout: "Log Out",
                copied: "Copied!",
                home: "Home",
                menu: "Menu",
                go_to_top: "Go to top",
            },
            auth: {
                login: {
                    title: "Please enter your {gameTypeName} username",
                },
                logout: {
                    title: "Are you sure you want to log out?",
                },
                login_redirect: {
                    title: "Click here to login",
                    method: "Login with {name}",
                },
                login_complete: {
                    title: "Logged in successfully",
                },
                username: "Username",
            },
            gift: {
                input_placeholder: "Recipient {gameTypeName} Username",
            },
            error: {
                page_not_found: "Page not found",
                cannot_add_package:
                    "You are not allowed to purchase this package",
            },
            footer: {
                join_our_discord: "Join our Discord",
                copyright: "© 2024 {storeName}. All rights reserved.",
                tebex: {
                    description:
                        "This website and its checkout process is operated by our online reseller & Merchant of Record, Tebex Limited, who also handles order-related inquiries and refunds.",
                    impressum: "Impressum",
                    privacy_policy: "Privacy Policy",
                    tos: "Terms of Service",
                },
            },
            messages: {
                success: {
                    added_to_cart: "{name} Added to cart",
                    removed_from_cart: "{name} Removed from cart",
                },
            },
            sidebar: {
                menu: "Menu",
            },
            titles: {
                login: "Login",
                package: "{name}",
            },
            checkout: {
                completed: {
                    title: "Thank you for your order",
                    subtitle:
                        "You should receive your items within a few minutes",
                },
            },
            cart: {
                title: "Cart",
                empty: "Your cart is empty",
                total: "Total",
                item: {
                    quantity: "x{quantity}",
                    gift_to: "Gift to {username}",
                },
            },
            category: {
                image_alt: "An image for the {name} category",
            },
        },
    },
}));
