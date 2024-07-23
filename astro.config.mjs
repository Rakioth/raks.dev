import tailwind from "@astrojs/tailwind"
import vercel from "@astrojs/vercel/serverless"
import { defineConfig } from "astro/config"

export default defineConfig({
  site: "https://raks.dev",
  trailingSlash: "never",
  output: "hybrid",
  adapter: vercel(),
  integrations: [tailwind()],
  compressHTML: true,
  build: {
    inlineStylesheets: "always",
  },
  devToolbar: {
    enabled: false,
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
})
