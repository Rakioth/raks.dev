import type { Locale, Translation } from "@/i18n/config"
import { DEFAULT_LOCALE, TRANSLATIONS } from "@/i18n/config"

export function getLocaleByUrl(url: URL) {
  const [, locale] = url.pathname.split("/")
  if (locale in TRANSLATIONS) return locale as Locale
  return DEFAULT_LOCALE
}

export function useTranslations(locale: Locale) {
  return (key: string, ...args: string[]) => {
    const keys = key.split(".")
    let translation = TRANSLATIONS[locale][keys[0]]

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
