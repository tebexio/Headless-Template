export interface Webstore {
    id: number;
    description: string;
    name: string;
    webstore_url: string;
    currency: string;
    lang: string;
    logo: string | null;
    platform_type: string;
    platform_type_id: number;
    created_at: string;
}
