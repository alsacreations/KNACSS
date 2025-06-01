// Script pour le guide de style

document.addEventListener("DOMContentLoaded", () => {
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
          // Basculer la visibilité du bloc de code
          codeBlock.hidden = !codeBlock.hidden

          // Mettre à jour les attributs ARIA et le texte du bouton en fonction du nouvel état
          button.setAttribute("aria-expanded", (!codeBlock.hidden).toString())
          button.textContent = !codeBlock.hidden
            ? "Masquer le code"
            : "Afficher le code"

          // Si le bloc de code est maintenant visible, on peuple son contenu
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
                  combinedHtml += elementToCopy.outerHTML + "\n"
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
    let formatted = htmlString.replace(/>\s*</g, ">\n<")
    let indentLevel = 0
    const lines = formatted.split("\n")
    const indentChar = "  "
    return lines
      .map((line) => {
        line = line.trim()

        if (line.startsWith("</")) {
          indentLevel = Math.max(0, indentLevel - 1)
        }

        const indentedLine = indentChar.repeat(indentLevel) + line

        // Augmente l'indentation pour les balises ouvrantes qui ne sont pas auto-fermantes
        // et ne sont pas des éléments vides typiques.
        if (
          line.startsWith("<") &&
          !line.startsWith("</") &&
          !line.endsWith("/>") &&
          !["input", "img", "meta", "link"].some((tag) =>
            line.startsWith("<" + tag),
          )
        ) {
          // Vérifie si la balise ne se ferme pas sur la même ligne
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
      .join("\n")
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
    // Construit le chemin vers le fichier HTML du composant.
    // Le chemin est relatif à la racine du site.
    const componentHtmlPath = `/components/${componentName}.html`
    // Construit le chemin vers le fichier CSS du composant.
    const componentCssPath = `/components/${componentName}.css`

    // Met à jour le lien CSS existant pour le composant.
    // On cible le lien avec l'ID 'component-styles'.
    const componentCssLink = document.getElementById("component-styles")
    if (componentCssLink) {
      componentCssLink.href = componentCssPath
    } else {
      // Si aucun lien avec cet ID n'est trouvé, on en crée un nouveau (mesure de sécurité).
      console.warn(
        "Aucun lien CSS avec l'ID 'component-styles' trouvé, un nouveau lien a été ajouté.",
      )
      const newLink = document.createElement("link")
      newLink.rel = "stylesheet"
      newLink.id = "component-styles" // Assigne l'ID pour les futures références
      newLink.href = componentCssPath
      document.head.appendChild(newLink)
    }

    // Utilise fetch pour charger le contenu du fichier HTML du composant.
    fetch(componentHtmlPath)
      .then((response) => {
        // Vérifie si la requête a réussi (statut HTTP 200-299).
        if (!response.ok) {
          // Si la requête échoue, lance une erreur avec le statut.
          throw new Error(
            `Erreur HTTP : ${response.status} pour ${componentHtmlPath}`,
          )
        }
        // Retourne le contenu de la réponse sous forme de texte.
        return response.text()
      })
      .then((html) => {
        // Injecte le contenu HTML récupéré dans le conteneur du composant.
        componentContainer.innerHTML = html

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
      })
      .catch((error) => {
        // Affiche une erreur dans la console et dans la page si le chargement échoue.
        console.error(
          `Impossible de charger le composant "${componentName}":`,
          error,
        )
        componentContainer.innerHTML = `<p style="color: var(--color-error, red);">Impossible de charger le composant : ${componentName}.<br>Chemin tenté : ${componentHtmlPath}.<br>Vérifiez la console pour plus de détails.</p>`
      })
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
