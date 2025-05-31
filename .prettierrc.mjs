/** @type {import("prettier").Config} */
export default {
  arrowParens: "always",
  bracketSpacing: true,
  bracketSameLine: true,
  editorconfig: true,
  jsxSingleQuote: true,
  printWidth: 80,
  quoteProps: "as-needed",
  semi: false,
  singleAttributePerLine: true,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
  overrides: [
    {
      files: ["*.css", "*.scss"],
      options: {
        singleQuote: false,
      },
    },
    {
      files: "*.stories.{ts,js,tsx,jsx}",
      options: {
        htmlWhitespaceSensitivity: "ignore",
      },
    },
  ],
}
