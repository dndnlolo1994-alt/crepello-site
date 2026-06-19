export type OrderMode = "disabled" | "whatsapp" | "external" | "internal";

export const ORDER_MODE: OrderMode = "whatsapp";

export const DEFAULT_LOCALE = "ar";
export const LOCALES = ["en", "ar"] as const;

export const PRODUCTION_URL = "https://www.crepello.co";
