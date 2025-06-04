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
   * Charge tous les CSS des composants dans le layer components
   * pour que tous les styles soient disponibles dans le styleguide
   * Exclut button.css car il est déjà chargé via app.css
   */
  function loadAllComponentStyles() {
    // Crée un élément style pour importer tous les CSS des composants
    const allComponentsStyleElement = document.createElement("style")
    allComponentsStyleElement.id = "all-components-styles"

    // Construit les imports pour tous les fichiers CSS des composants, sauf button.css
    const imports = Object.entries(cssComponentModules)
      .filter(([path]) => !path.includes("/button/button.css")) // Exclut button.css
      .map(([, cssPath]) => `@import url("${cssPath}") layer(components);`)
      .join("\n")

    allComponentsStyleElement.textContent = imports
    document.head.appendChild(allComponentsStyleElement)

    console.log(
      `Chargement de ${Object.keys(cssComponentModules).length - 1} feuilles de styles de composants dans le layer components (button.css exclu car déjà chargé)`,
    )
  }

  // Charge immédiatement tous les styles des composants
  loadAllComponentStyles()

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

    showCodeButton.addEventListener("click", () => {
      const codeBlockId = showCodeButton.getAttribute("aria-controls")
      const codeBlock = document.getElementById(codeBlockId)

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
          // Le contenu à afficher est celui de .styleguide-component-preview
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

  // Crée un objet URLSearchParams pour accéder facilement aux paramètres de l'URL.
  const params = new URLSearchParams(window.location.search)
  // Récupère la valeur du paramètre 'component'.
  const componentName = params.get("component")

  // Si le paramètre 'component' est présent dans l'URL.
  if (componentName) {
    // Construit la clé pour accéder au module HTML importé par Vite.
    const htmlModuleKey = `/components/${componentName}.html`

    const componentHtmlContent = htmlComponentModules[htmlModuleKey]

    // Vérifie si le contenu HTML du composant a été trouvé.
    if (componentHtmlContent === undefined) {
      const errorMessage = `<p style="color: var(--color-error, red);">Impossible de charger le contenu HTML pour le composant : ${componentName}.<br>Vérifiez que le fichier ${htmlModuleKey} existe et est inclus par Vite.<br>Vérifiez la console pour plus de détails.</p>`
      componentPreviewContainer.innerHTML = errorMessage // Injecte l'erreur dans le conteneur de prévisualisation
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

    // Injecte le contenu HTML récupéré dans le conteneur du composant.
    // Plus besoin de fetch, car componentHtmlContent est déjà le contenu du fichier.
    componentPreviewContainer.innerHTML = componentHtmlContent // Modifié pour cibler le conteneur de prévisualisation

    // Met à jour les titres de la page et de la section.
    const readableComponentName = componentName
      .split("/")
      .pop()
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
    const mainTitle = document.querySelector(".styleguide-header h1")
    // const componentTitle = document.querySelector(".styleguide-component-title") // Sélection du nouveau titre h2
    const pageTitle = document.querySelector("title")

    if (mainTitle)
      mainTitle.textContent = `Styleguide : ${readableComponentName}`
    // if (componentTitle) // Mise à jour du titre du composant
    //   componentTitle.textContent = readableComponentName;
    if (pageTitle)
      pageTitle.textContent = `Styleguide : ${readableComponentName}`

    // Maintenant que le HTML du composant est injecté, initialiser les boutons "Afficher le code".
    initializeShowCodeButtons()
  } else {
    // Si le paramètre 'component' est manquant, affiche un message d'erreur.
    const errorMessage = `<p>Aucun composant spécifié. Veuillez ajouter un paramètre "?component=nom-du-composant" à l'URL (par exemple, ?component=button/button).</p>`
    componentPreviewContainer.innerHTML = errorMessage // Injecte l'erreur dans le conteneur de prévisualisation
    console.warn(errorMessage.replace(/<[^>]+>/g, "")) // Affiche aussi dans la console sans les balises HTML

    // Cache les titres par défaut si aucun composant n'est chargé
    const mainTitle = document.querySelector(".styleguide-header h1")
    // const componentTitle = document.querySelector(".styleguide-component-title")
    // const sectionTitle = document.querySelector(".styleguide-section h2") // Ancienne référence, peut être supprimée ou ajustée
    if (mainTitle) mainTitle.textContent = "Styleguide"
    // if (componentTitle) componentTitle.textContent = "Erreur" // Met à jour le titre du composant en cas d'erreur
    // if (sectionTitle) sectionTitle.textContent = "Erreur"
  }
})
