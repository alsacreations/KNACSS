// vite.config.js
// https://vitejs.dev/guide/build.html

import { defineConfig } from "vite"
import handlebars from "vite-plugin-handlebars"
import fs from "fs"
import { resolve } from "path"

// Correction pour __dirname en ES Module
const __dirname = new URL(".", import.meta.url).pathname

export default defineConfig(({ command }) => {
  const base = command === "build" ? "/KNACSS/" : "/"
  return {
    // config options
    base: base, // Défini dynamiquement
    appType: "mpa",
    // Évite l'analyse JS sur les fichiers HTML, ils sont gérés par handlebars
    assetsInclude: ["**/*.html"],
    plugins: [
      // Réécriture des URLs friendly en DEV (ex: /presentation, /button, ...)
      {
        name: "friendly-slug-rewrite",
        apply: "serve",
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            const url = (req.url || "").split("?")[0]
            // Ignore les requêtes fichiers (avec .) et les chemins connus
            const isFile = url.includes(".")
            const isExcluded =
              /^\/(?:assets|images|fonts|css|js|natives|pages|@vite|@id|@fs|__vite)\//.test(
                url,
              ) || url === "/favicon.ico"
            const isRoot = url === "/" || url === ""
            const isIndex = url === "/index.html"
            if (!isFile && !isExcluded && !isRoot && !isIndex) {
              req.url = "/index.html"
            }
            next()
          })
        },
      },
      handlebars({
        context: () => {
          // Contexte global + composants pour la sidebar
          const ctx = JSON.parse(
            fs.readFileSync(
              new URL("./templates/context.json", import.meta.url),
            ),
          )
          const components = JSON.parse(
            fs.readFileSync(
              new URL("./assets/data/components.json", import.meta.url),
            ),
          )
          // Trouve l'entrée d'accueil
          const home = components.find(
            (c) =>
              c.id === "pages/presentation" ||
              c.slug === "presentation" ||
              String(c.label || "").toLowerCase() === "accueil",
          )
          // Trie alphabétiquement les autres composants par label
          const componentsSorted = components
            .filter((c) => c !== home)
            .slice()
            .sort((a, b) =>
              String(a.label || "").localeCompare(String(b.label || ""), "fr", {
                sensitivity: "base",
              }),
            )
          return { ...ctx, base, components, home, componentsSorted }
        },
        partialDirectory: resolve(__dirname, "templates/partials"),
        // Pas de 'entry' en dev: transformIndexHtml traite les fichiers HTML servis (index, styleguide,…)
      }),
    ],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          shell: resolve(__dirname, "pages/styleguide.html"),
        },
      },
    },
  }
})
