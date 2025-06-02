// Script pour le guide de style

document.addEventListener("DOMContentLoaded", () => {
  // Importe les modules des composants HTML comme texte brut et les CSS comme URL.
  // Vite traitera ces imports lors du build pour inclure les fichiers.
  const htmlComponentModules = import.meta.glob("/components/**/*.html", {
    eager: true,
    query: "?raw",
    import: "default",
  })
  const cssComponentModules = import.meta.glob("/components/**/*.css", {
    eager: true,
    query: "?url",
    import: "default",
  })

  /**
   * Initialise les boutons "Afficher/Masquer le code".
   * Attache les écouteurs d'événements aux boutons .js-show-code.
   */
  function initializeShowCodeButtons() {
    const componentContainer = document.querySelector(".styleguide-component")
    if (!componentContainer) return

    const showCodeButtons = componentContainer.querySelectorAll(".js-show-code")

    showCodeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const codeBlockId = button.getAttribute("aria-controls")
        const codeBlock = document.getElementById(codeBlockId)

        if (codeBlock) {
          codeBlock.hidden = !codeBlock.hidden
          button.setAttribute("aria-expanded", (!codeBlock.hidden).toString())
          button.textContent = !codeBlock.hidden
            ? "Masquer le code"
            : "Afficher le code"

          if (!codeBlock.hidden) {
            const articleComponent = button.closest(
              "article.styleguide-component",
            )
            let componentPreview = null
            if (articleComponent) {
              componentPreview = articleComponent.querySelector(
                ".styleguide-component-preview",
              )
            }

            if (componentPreview) {
              let combinedHtml = ""
              componentPreview.childNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                  const elementToCopy = node.cloneNode(true)
                  if (elementToCopy.id) {
                    elementToCopy.removeAttribute("id")
                  }
                  combinedHtml += elementToCopy.outerHTML + "\n" // Utiliser \n au lieu de \\n
                }
              })

              const codeElement = codeBlock.querySelector("code.language-html")
              if (codeElement) {
                const formattedHtml = formatHtml(combinedHtml.trim())
                codeElement.textContent = formattedHtml
              }
            } else {
              console.warn(
                "Élément .styleguide-component-preview non trouvé pour le bouton :",
                button,
              )
            }
          }
        }
      })
    })
  }

  /**
   * Formatte une chaîne HTML pour un affichage plus lisible.
   * @param {string} htmlString La chaîne HTML à formatter.
   * @returns {string} La chaîne HTML formattée.
   */
  function formatHtml(htmlString) {
    let formatted = htmlString.replace(/>\s*</g, ">\n<") // Utiliser \n
    let indentLevel = 0
    const lines = formatted.split("\n") // Utiliser \n
    const indentChar = "  "
    return lines
      .map((line) => {
        line = line.trim()
        if (line.startsWith("</")) {
          indentLevel = Math.max(0, indentLevel - 1)
        }
        const indentedLine = indentChar.repeat(indentLevel) + line
        if (
          line.startsWith("<") &&
          !line.startsWith("</") &&
          !line.endsWith("/>") &&
          !["input", "img", "meta", "link"].some((tag) =>
            line.startsWith("<" + tag),
          )
        ) {
          const tagNameMatch = line.match(/^<([a-z0-9]+)/i)
          if (tagNameMatch) {
            const tagName = tagNameMatch[1]
            const selfClosingOrSameLineCloseRegex = new RegExp(
              `^<${tagName}[^>]*>.*</${tagName}>$`,
              "i",
            )
            if (!selfClosingOrSameLineCloseRegex.test(line)) {
              indentLevel++
            }
          }
        }
        return indentedLine
      })
      .join("\n") // Utiliser \n
  }

  // Récupère l'élément où le contenu du composant sera injecté.
  const componentContainer = document.querySelector(".styleguide-component")

  // Si le conteneur n'existe pas, arrête le script pour éviter des erreurs.
  if (!componentContainer) {
    console.error(
      "Erreur : Le conteneur .styleguide-component est introuvable.",
    )
    return
  }

  // Crée un objet URLSearchParams pour accéder facilement aux paramètres de l'URL.
  const params = new URLSearchParams(window.location.search)
  // Récupère la valeur du paramètre 'component'.
  const componentName = params.get("component")

  // Si le paramètre 'component' est présent dans l'URL.
  if (componentName) {
    // Construit les clés pour accéder aux modules importés par Vite.
    const htmlModuleKey = `/components/${componentName}.html`
    const cssModuleKey = `/components/${componentName}.css`

    const componentHtmlContent = htmlComponentModules[htmlModuleKey]
    const componentCssPath = cssComponentModules[cssModuleKey]

    // Vérifie si le contenu HTML du composant a été trouvé.
    if (componentHtmlContent === undefined) {
      const errorMessage = `<p style="color: var(--color-error, red);">Impossible de charger le contenu HTML pour le composant : ${componentName}.<br>Vérifiez que le fichier ${htmlModuleKey} existe et est inclus par Vite.<br>Vérifiez la console pour plus de détails.</p>`
      componentContainer.innerHTML = errorMessage
      console.error(
        `Contenu HTML non trouvé pour le composant "${componentName}" via import.meta.glob. Clé tentée : ${htmlModuleKey}. Modules HTML disponibles :`,
        Object.keys(htmlComponentModules),
      )
      // Cache les titres si le composant n'est pas chargé
      const mainTitle = document.querySelector(".styleguide-header h1")
      const pageTitle = document.querySelector("title")
      if (mainTitle) mainTitle.textContent = "Styleguide : Erreur"
      if (pageTitle) pageTitle.textContent = "Styleguide : Erreur"
      return
    }

    // Met à jour le lien CSS pour le composant.
    if (componentCssPath) {
      let componentCssLink = document.getElementById("component-styles")
      if (componentCssLink) {
        componentCssLink.href = componentCssPath
      } else {
        console.warn(
          "Aucun lien CSS avec l'ID 'component-styles' trouvé, un nouveau lien a été ajouté.",
        )
        const newLink = document.createElement("link")
        newLink.rel = "stylesheet"
        newLink.id = "component-styles"
        newLink.href = componentCssPath
        document.head.appendChild(newLink)
      }
    } else {
      console.warn(
        `Chemin CSS non trouvé pour le composant "${componentName}" via import.meta.glob. Clé tentée : ${cssModuleKey}. Il n'y aura pas de style spécifique pour ce composant. Modules CSS disponibles :`,
        Object.keys(cssComponentModules),
      )
      // Optionnel : supprimer un ancien lien CSS si le nouveau n'est pas trouvé
      const oldCssLink = document.getElementById("component-styles")
      if (oldCssLink) oldCssLink.removeAttribute("href")
    }

    // Injecte le contenu HTML récupéré dans le conteneur du composant.
    // Plus besoin de fetch, car componentHtmlContent est déjà le contenu du fichier.
    componentContainer.innerHTML = componentHtmlContent

    // Met à jour les titres de la page et de la section.
    const readableComponentName = componentName
      .split("/")
      .pop()
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
    const mainTitle = document.querySelector(".styleguide-header h1")
    const pageTitle = document.querySelector("title")

    if (mainTitle)
      mainTitle.textContent = `Styleguide : ${readableComponentName}`
    if (pageTitle)
      pageTitle.textContent = `Styleguide : ${readableComponentName}`

    // Maintenant que le HTML du composant est injecté, initialiser les boutons "Afficher le code".
    initializeShowCodeButtons()
  } else {
    // Si le paramètre 'component' est manquant, affiche un message d'erreur.
    const errorMessage = `<p>Aucun composant spécifié. Veuillez ajouter un paramètre "?component=nom-du-composant" à l'URL (par exemple, ?component=button/button).</p>`
    componentContainer.innerHTML = errorMessage
    console.warn(errorMessage.replace(/<[^>]+>/g, "")) // Affiche aussi dans la console sans les balises HTML

    // Cache les titres par défaut si aucun composant n'est chargé
    const mainTitle = document.querySelector(".styleguide-header h1")
    const sectionTitle = document.querySelector(".styleguide-section h2")
    if (mainTitle) mainTitle.textContent = "Styleguide"
    if (sectionTitle) sectionTitle.textContent = "Erreur"
  }
})
