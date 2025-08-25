// Script pour le guide de style

document.addEventListener("DOMContentLoaded", () => {
  /**
   * Met à jour l'état actif dans la sidebar (aria-current)
   */
  function updateActiveSidebarLink(componentName) {
    const links = document.querySelectorAll(
      ".styleguide-sidebar a[data-component-id]",
    )
    links.forEach((a) => {
      if (a.getAttribute("data-component-id") === componentName) {
        a.setAttribute("aria-current", "page")
      } else {
        a.removeAttribute("aria-current")
      }
    })
  }

  /**
   * Navigation côté client: clique sur la sidebar met à jour l'URL et le contenu
   */
  function setupClientSideNav() {
    const sidebar = document.querySelector(".styleguide-sidebar")
    if (!sidebar) return
    sidebar.addEventListener("click", (e) => {
      const target = e.target
      if (target instanceof HTMLAnchorElement && target.dataset.componentId) {
        e.preventDefault()
        const id = target.dataset.componentId
        const slug = target.dataset.componentSlug || id.split("/").pop()
        const basePath = window.location.pathname.replace(/[^/]*$/, "")
        const url = new URL(basePath + slug, window.location.origin)
        history.pushState({ component: id }, "", url.toString())
        loadComponent(id)
      }
    })

    window.addEventListener("popstate", () => {
      let id = new URLSearchParams(window.location.search).get("component")
      if (!id) {
        const path = window.location.pathname.replace(/\/$/, "")
        const last = path.split("/").pop()
        if (last && !last.endsWith(".html")) {
          const a = document.querySelector(
            `.styleguide-sidebar a[data-component-slug="${CSS.escape(last)}"]`,
          )
          if (a) id = a.getAttribute("data-component-id")
        }
      }
      if (id) loadComponent(id)
    })
  }

  /**
   * Charge un composant par son id et met à jour titres + état actif
   */
  function loadComponent(componentName) {
    const isPage = componentName.startsWith("pages/")
    let htmlModuleKey
    let htmlContent

    if (isPage) {
      // Pages éditoriales (ex: pages/presentation)
      const pagePath = componentName.replace(/^pages\//, "")
      htmlModuleKey = `/pages/${pagePath}.html`
      htmlContent = pagesModules[htmlModuleKey]
      if (htmlContent === undefined) {
        const errorMessage = `<p style="color: var(--color-error, red);">Impossible de charger la page : ${componentName}.<br>Vérifiez que le fichier ${htmlModuleKey} existe et est inclus par Vite.</p>`
        componentPreviewContainer.innerHTML = errorMessage
        console.error(`Page non trouvée pour "${componentName}".`)
        return
      }
    } else {
      // Composants natifs (ex: input/input)
      htmlModuleKey = `/natives/${componentName}.html`
      htmlContent = htmlComponentModules[htmlModuleKey]
      if (htmlContent === undefined) {
        const errorMessage = `<p style="color: var(--color-error, red);">Impossible de charger le contenu HTML pour le composant : ${componentName}.<br>Vérifiez que le fichier ${htmlModuleKey} existe et est inclus par Vite.</p>`
        componentPreviewContainer.innerHTML = errorMessage
        console.error(`Contenu HTML non trouvé pour "${componentName}".`)
        return
      }
    }

    componentPreviewContainer.innerHTML = htmlContent

    const readableComponentName = componentName
      .split("/")
      .pop()
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
    // Ne pas écraser le titre de la page globale.
    // Mettre éventuellement à jour un sous-titre si présent.
    const subtitle = document.querySelector("#component-title")
    if (subtitle) subtitle.textContent = readableComponentName

    // Bouton/code visible uniquement pour les composants
    const actions = document.querySelector(".styleguide-component-actions")
    const codeRegion = document.querySelector(".styleguide-component-code")
    if (actions && codeRegion) {
      if (isPage) {
        actions.hidden = true
        codeRegion.hidden = true
      } else {
        actions.hidden = false
        // Remise à l'état initial du bloc code et du bouton
        codeRegion.hidden = true
        const showCodeButton = actions.querySelector(".js-show-code")
        if (showCodeButton) {
          showCodeButton.setAttribute("aria-expanded", "false")
          showCodeButton.textContent = "Afficher le code"
        }
        // N'attache le listener qu'une fois (le guard est dans initializeShowCodeButtons)
        initializeShowCodeButtons()
      }
    }

    if (!isPage) {
      reinitializeComponentModules(componentName)
    }
    updateActiveSidebarLink(componentName)
    // Gestion focus accessibilité
    const h3 = componentPreviewContainer.querySelector("h3, h2, h1")
    if (h3) h3.setAttribute("tabindex", "-1"), h3.focus()
  }
  // Importe les modules des composants HTML comme texte brut.
  // Vite traitera ces imports lors du build pour inclure les fichiers.
  // N'importe que les fichiers HTML des composants (exclut /natives/styleguide.html)
  const htmlComponentModules = import.meta.glob("/natives/*/*.html", {
    eager: true,
    query: "?raw",
    import: "default",
  })
  const pagesModules = import.meta.glob("/pages/**/*.html", {
    eager: true,
    query: "?raw",
    import: "default",
  })

  /**
   * Réinitialise les modules de composants spécifiques après injection du HTML
   * @param {string} componentName - Le nom du composant (ex: "dialog/dialog")
   */
  function reinitializeComponentModules(componentName) {
    // Réinitialise le module Dialog si c'est le composant Dialog
    if (componentName === "dialog/dialog") {
      // Importe et réinitialise le module Dialog
      import("/natives/dialog/dialog.js")
        .then((dialogModule) => {
          if (dialogModule.initDialogs) {
            console.log("🔄 Réinitialisation du module Dialog")
            dialogModule.initDialogs()
          }
        })
        .catch((error) => {
          console.warn(
            "⚠️ Impossible de réinitialiser le module Dialog:",
            error,
          )
        })
    }

    // Réinitialise le module Textarea (compteur de caractères)
    if (componentName === "textarea/textarea") {
      try {
        if (
          window.CharacterCounter &&
          typeof window.CharacterCounter.init === "function"
        ) {
          window.CharacterCounter.init()
          console.log(
            "🔄 Réinitialisation du module Textarea (CharacterCounter)",
          )
        } else {
          // Fallback: importe le module si non présent (dev/rafraîchissement partiel)
          import("/natives/textarea/textarea.js").then(() => {
            if (
              window.CharacterCounter &&
              typeof window.CharacterCounter.init === "function"
            ) {
              window.CharacterCounter.init()
              console.log(
                "🔄 Réinitialisation du module Textarea (CharacterCounter)",
              )
            }
          })
        }
      } catch (error) {
        console.warn(
          "⚠️ Impossible de réinitialiser le module Textarea:",
          error,
        )
      }
    }

    // D'autres composants peuvent être ajoutés ici selon le besoin
    // if (componentName === "textarea/textarea") { ... }
  }

  /**
   * Initialise les boutons "Afficher/Masquer le code".
   * Attache les écouteurs d'événements aux boutons .js-show-code.
   */
  function initializeShowCodeButtons() {
    // Le bouton est maintenant directement dans styleguide.html, pas dans le contenu injecté
    const showCodeButton = document.querySelector(".js-show-code")
    const componentPreviewContainer = document.querySelector(
      ".styleguide-component-preview",
    ) // Conteneur où le HTML du composant est injecté

    if (!showCodeButton || !componentPreviewContainer) {
      console.warn(
        "Bouton 'Afficher le code' ou conteneur de prévisualisation non trouvé.",
      )
      return
    }

    // Évite les doubles bindings lors des changements de composants
    if (showCodeButton.dataset.bound === "true") return
    showCodeButton.dataset.bound = "true"

    showCodeButton.addEventListener("click", () => {
      const codeBlockId = showCodeButton.getAttribute("aria-controls")
      let codeBlock = codeBlockId ? document.getElementById(codeBlockId) : null
      if (!codeBlock) {
        codeBlock = document.querySelector(".styleguide-component-code")
      }

      if (codeBlock) {
        codeBlock.hidden = !codeBlock.hidden
        showCodeButton.setAttribute(
          "aria-expanded",
          (!codeBlock.hidden).toString(),
        )
        showCodeButton.textContent = !codeBlock.hidden
          ? "Masquer le code"
          : "Afficher le code"

        if (!codeBlock.hidden) {
          // Regénère à la volée depuis le DOM actuel
          const componentHtmlContent = componentPreviewContainer.innerHTML
          const codeElement = codeBlock.querySelector("code.language-html")
          if (codeElement) {
            const formattedHtml = formatHtml(componentHtmlContent.trim())
            codeElement.textContent = formattedHtml
          }
        } else {
          // Optionnel : vider le contenu du code lorsque masqué pour économiser des ressources
          // const codeElement = codeBlock.querySelector("code.language-html");
          // if (codeElement) codeElement.textContent = "";
        }
      } else {
        // Pas de bloc code: s'assurer que le bouton reste cohérent
        showCodeButton.setAttribute("aria-expanded", "false")
      }
    })
  }

  /**
   * Formatte une chaîne HTML pour un affichage plus lisible.
   * @param {string} htmlString La chaîne HTML à formatter.
   * @returns {string} La chaîne HTML formattée.
   */
  function formatHtml(htmlString) {
    let cleanHtml = htmlString.trim()
    // Normaliser les attributs booléens (ex: checked="" -> checked)
    cleanHtml = cleanHtml.replace(/(\s\w+)=["']{2}/g, "$1")

    // Séparer les balises et le texte pour une meilleure granularité des lignes
    // 1. Ajouter un saut de ligne après chaque '>'
    cleanHtml = cleanHtml.replace(/>/g, ">\n")
    // 2. Ajouter un saut de ligne avant chaque '<'
    cleanHtml = cleanHtml.replace(/</g, "\n<")
    // 3. Supprimer les sauts de ligne multiples et les espaces autour des sauts de ligne
    cleanHtml = cleanHtml.replace(/\s*\n\s*/g, "\n")
    // 4. Supprimer les sauts de ligne au début et à la fin après le nettoyage
    cleanHtml = cleanHtml.trim()

    let indentLevel = 0
    const lines = cleanHtml.split("\n")
    const indentChar = "  "
    const voidElements = new Set([
      "area",
      "base",
      "br",
      "col",
      "embed",
      "hr",
      "img",
      "input",
      "link",
      "meta",
      "param",
      "source",
      "track",
      "wbr",
    ])

    let resultLines = []

    for (const rawLine of lines) {
      const line = rawLine.trim()
      if (!line) continue // Ignorer les lignes vides après trim

      let currentIndent = indentLevel

      // Si la ligne est une balise fermante, décrémenter le niveau pour cette ligne.
      if (line.startsWith("</")) {
        currentIndent = Math.max(0, indentLevel - 1)
      }

      resultLines.push(indentChar.repeat(currentIndent) + line)

      // Mettre à jour indentLevel pour la PROCHAINE ligne.
      if (line.startsWith("</")) {
        // Balise fermante
        indentLevel = Math.max(0, indentLevel - 1)
      } else if (line.startsWith("<") && !line.endsWith("/>")) {
        // Balise ouvrante (pas auto-fermante style XML)
        const tagNameMatch = line.match(/^<([a-zA-Z0-9]+)/)
        if (tagNameMatch) {
          const tagName = tagNameMatch[1].toLowerCase()
          // N'incrémente pas si c'est une balise void.
          // La vérification de la fermeture sur la même ligne n'est plus nécessaire ici
          // car la tokenisation a déjà séparé les balises.
          if (!voidElements.has(tagName)) {
            indentLevel++
          }
        }
      }
    }
    return resultLines.join("\n")
  }

  // Récupère l'élément où le contenu du composant sera injecté.
  const componentPreviewContainer = document.querySelector(
    ".styleguide-component-preview",
  ) // Modifié pour cibler le conteneur de prévisualisation

  // Si le conteneur n'existe pas, arrête le script pour éviter des erreurs.
  if (!componentPreviewContainer) {
    console.error(
      "Erreur : Le conteneur .styleguide-component-preview est introuvable.",
    )
    return
  }

  // Récupère le composant depuis ?component=... ou, à défaut, depuis un slug /:slug
  const params = new URLSearchParams(window.location.search)
  let componentName = params.get("component")
  if (!componentName) {
    const path = window.location.pathname.replace(/\/$/, "")
    const last = path.split("/").pop()
    if (last && !last.endsWith(".html")) {
      const a = document.querySelector(
        `.styleguide-sidebar a[data-component-slug="${CSS.escape(last)}"]`,
      )
      if (a) componentName = a.getAttribute("data-component-id")
    }
  }

  // Si le paramètre 'component' est présent dans l'URL.
  if (componentName) {
    loadComponent(componentName)
  } else {
    // Si aucun composant n'est détecté (accès direct au shell), charger la présentation par défaut
    const a = document.querySelector(
      '.styleguide-sidebar a[data-component-id="pages/presentation"]',
    )
    if (a) {
      loadComponent("pages/presentation")
    } else {
      const msg = `<p>Chargement de la page de présentation…</p>`
      componentPreviewContainer.innerHTML = msg
    }
  }

  // Active la navigation côté client
  setupClientSideNav()
})
