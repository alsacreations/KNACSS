// Script pour le guide de style

document.addEventListener("DOMContentLoaded", () => {
  // Sélectionne tous les boutons qui servent à afficher/masquer le code
  const showCodeButtons = document.querySelectorAll(".js-show-code")

  showCodeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const codeBlockId = button.getAttribute("aria-controls")
      const codeBlock = document.getElementById(codeBlockId)

      if (codeBlock) {
        const isHidden = codeBlock.hidden
        codeBlock.hidden = !isHidden
        button.setAttribute("aria-expanded", isHidden.toString())
        button.textContent = isHidden ? "Masquer le code" : "Afficher le code"

        // Si on affiche le bloc de code, on peuple le contenu
        if (isHidden) {
          const componentPreview = button
            .closest(".styleguide-component")
            .querySelector(".styleguide-component-preview")

          if (componentPreview) {
            // Récupère le HTML de tous les enfants directs du conteneur de prévisualisation
            let combinedHtml = ""
            componentPreview.childNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                // S'assurer que c'est un élément HTML
                const elementToCopy = node.cloneNode(true)
                // Nettoyage des attributs spécifiques à l\'exemple (id par exemple)
                if (elementToCopy.id) {
                  elementToCopy.removeAttribute("id")
                }
                combinedHtml += elementToCopy.outerHTML + "\n" // Ajouter un saut de ligne entre les éléments
              }
            })

            const codeElement = codeBlock.querySelector("code")
            if (codeElement) {
              // Formatte le HTML pour un meilleur affichage
              const formattedHtml = formatHtml(combinedHtml.trim())
              codeElement.textContent = formattedHtml
            }
          }
        }
      }
    })
  })

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
})
