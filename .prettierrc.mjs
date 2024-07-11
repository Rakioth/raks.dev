/**
 * @type {import("prettier").Config}
 */
export default {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  jsxSingleQuote: false,
  quoteProps: "consistent",
  arrowParens: "always",
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-astro-organize-imports",
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
}
