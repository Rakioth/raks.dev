/// <reference types="astro/client" />

import type { Theme } from "@/consts/theme"

interface ThemeToggledEventDetail {
  theme: Theme
}

interface ThemeToggledEvent extends CustomEvent {
  detail: ThemeToggledEventDetail
}

declare global {
  interface Window {
    getThemePreference(): Theme
    updateSeoState(theme: Theme): void
  }

  interface Document {
    addEventListener(
      type: "themetoggled",
      listener: (ev: ThemeToggledEvent) => void
    ): void
    dispatchEvent(event: ThemeToggledEvent): boolean
  }
}
