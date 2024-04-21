import type { APIContext } from "astro"

import { BACKGROUND_COLOR, THEME_COLOR } from "@/consts/theme"
import { getLocaleByUrl, translations, useTranslations } from "@/i18n"

export function getStaticPaths() {
	return Object.keys(translations).map((lang) => ({ params: { locale: lang } }))
}

export const GET = (context: APIContext) => {
	const locale = getLocaleByUrl(context.url)
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
					src: "/favicon/manifest/light/pwa-maskable-64x64.png",
					sizes: "64x64",
					type: "image/png",
					purpose: "maskable",
				},
				{
					src: "/favicon/manifest/light/pwa-maskable-192x192.png",
					sizes: "192x192",
					type: "image/png",
					purpose: "maskable",
				},
				{
					src: "/favicon/manifest/light/pwa-maskable-512x512.png",
					sizes: "512x512",
					type: "image/png",
					purpose: "maskable",
				},
			],
			background_color: BACKGROUND_COLOR.LIGHT,
			theme_color: THEME_COLOR.LIGHT,
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
