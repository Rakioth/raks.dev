import type { APIRoute } from "astro"

import type { Theme } from "@/consts/theme"
import { BACKGROUND_COLOR, THEME_COLOR } from "@/consts/theme"
import { TRANSLATIONS, getLocale, useTranslations } from "@/i18n"

export function getStaticPaths() {
  return Object.keys(TRANSLATIONS).flatMap((locale) =>
    Object.keys(THEME_COLOR).map((theme) => ({ params: { locale, theme } }))
  )
}

export const GET: APIRoute = ({ params, currentLocale }) => {
  const theme = params.theme as Theme
  const locale = getLocale(currentLocale)
  const t = useTranslations(locale)

  return new Response(
    JSON.stringify({
      name: t("title", t("subtitle")),
      short_name: t("site-name"),
      description: t("description"),
      start_url: "/",
      display: "fullscreen",
      icons: [
        {
          src: "/favicon/manifest/pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/favicon/manifest/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/favicon/manifest/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: `/favicon/manifest/${theme}/pwa-maskable-64x64.png`,
          sizes: "64x64",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: `/favicon/manifest/${theme}/pwa-maskable-192x192.png`,
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: `/favicon/manifest/${theme}/pwa-maskable-512x512.png`,
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
      background_color: BACKGROUND_COLOR[theme],
      theme_color: THEME_COLOR[theme],
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/manifest+json",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    }
  )
}
