/**
 * @type {import('tailwindcss').Config}
 */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#fef4ff",
					100: "#fbe9fe",
					200: "#f7d1fd",
					300: "#f2aef9",
					400: "#ec7df5",
					500: "#de4bea",
					600: "#ce3ed6",
					700: "#a621aa",
					800: "#891d8b",
					900: "#721d72",
					950: "#4c064c",
				},
			},
		},
	},
	darkMode: "class",
	plugins: [
		function ({ addVariant }) {
			addVariant("any-hover", "@media (any-hover: hover) { &:hover }")
		},
	],
}
