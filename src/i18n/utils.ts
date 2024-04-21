import type { Locale, Translation } from "@/i18n/config"
import { defaultLocale, translations } from "@/i18n/config"

export function getLocaleByUrl(url: URL) {
	const [, locale] = url.pathname.split("/")
	if (locale in translations) return locale as Locale
	return defaultLocale
}

export function getNextLocale(locale: Locale) {
	const locales = Object.keys(translations) as Locale[]
	const index = locales.indexOf(locale)
	if (index !== -1) {
		const nextIndex = (index + 1) % locales.length
		return locales[nextIndex]
	}
	return defaultLocale
}

export function useTranslations(locale: Locale) {
	return (key: string, ...args: string[]) => {
		const keys = key.split(".")
		let translation = translations[locale][keys[0]]

		if (keys.length > 1) {
			for (let i = 1; i < keys.length; i++) {
				translation = (translation as Translation)[keys[i]]
			}
		}

		if (args.length > 0) {
			for (let i = 0; i < args.length; i++) {
				translation = (translation as string).replace(`{${i}}`, args[i])
			}
		}
		return translation as string
	}
}
