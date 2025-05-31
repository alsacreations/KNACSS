// vite.config.js
// https://vitejs.dev/guide/build.html

import { defineConfig } from "vite"
import { resolve } from "path"

// Correction pour __dirname en ES Module
const __dirname = new URL(".", import.meta.url).pathname

export default defineConfig(({ command }) => {
  const base = command === "build" ? "/KNACSS/" : "/"
  return {
    // config options
    base: base, // Défini dynamiquement
    appType: "mpa",
    plugins: [],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          button: resolve(__dirname, "components/button/button.html"),
        },
      },
    },
  }
})
