import enTranslations from "@/i18n/translations/en.json"
import esTranslations from "@/i18n/translations/es.json"

export type Locale = "en" | "es"
export interface Translation {
	[key: string]: string | Translation
}

export const defaultLocale: Locale = "en"
export const translations: Record<Locale, Translation> = {
	en: enTranslations,
	es: esTranslations,
} as const
