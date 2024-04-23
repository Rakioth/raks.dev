/// <reference types="astro/client" />

interface Window {
	getThemePreference(): string
	updateSeoState(theme: string): void
}
