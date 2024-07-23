import type { APIRoute } from "astro"

import { DEFAULT_LOCALE } from "@/i18n"

export const prerender = false

export const GET: APIRoute = async ({ preferredLocale, redirect }) => {
  const locale = preferredLocale || DEFAULT_LOCALE
  return redirect(`/${locale}`, 302)
}
