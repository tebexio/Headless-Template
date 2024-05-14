export interface User {
    id: string;
    username: string;
    updated_at: string;
    created_at: string;
    cache_expire: string;
    meta: Record<string, any>;
}
