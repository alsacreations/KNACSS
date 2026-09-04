// Script pour le guide de style

// Charge les métadonnées des composants
import componentsData from "/assets/data/components.json"

// Importe les modules des composants HTML comme texte brut
const htmlComponentModules = import.meta.glob("/natives/*/*.html", {
  eager: true,
  query: "?raw",
  import: "default",
})

// Importe les contenus des pages HTML
const htmlPageContentModules = import.meta.glob("/pages/*.html", {
  eager: true,
  query: "?raw",
  import: "default",
})

// Importe les templates de structure
const templateMainPage = import.meta.glob("/templates/partials/main-page.hbs", {
  eager: true,
  query: "?raw",
  import: "default",
})["/templates/partials/main-page.hbs"]

const templateMainComponent = import.meta.glob(
  "/templates/partials/main-component.hbs",
  {
    eager: true,
    query: "?raw",
    import: "default",
  },
)["/templates/partials/main-component.hbs"]

document.addEventListener("DOMContentLoaded", () => {
  // Chargement paresseux du CSS natif pour extraire les variables
  let nativesCssText = ""
  /** @type {Promise<string> | null} */
  let nativesCssTextPromise = null
  function ensureNativesCssText() {
    if (nativesCssText) return Promise.resolve(nativesCssText)
    if (!nativesCssTextPromise) {
      // 1) Essaye d'importer le fichier en raw (OK en dev et build Vite)
      nativesCssTextPromise = import("/assets/css/natives.css?raw")
        .then((mod) => {
          const txt = typeof mod?.default === "string" ? mod.default : ""
          nativesCssText = txt || ""
          return nativesCssText
        })
        .catch(() => {
          // 2) Repli: fetch (utile si l'import raw échoue dans un contexte atypique)
          const base = document.body?.getAttribute("data-base") || "/"
          const url = new URL(
            "assets/css/natives.css",
            window.location.origin + base,
          )
          return fetch(url.toString())
            .then((r) => (r.ok ? r.text() : ""))
            .then((t) => {
              nativesCssText = t || ""
              return nativesCssText
            })
            .catch(() => "")
        })
    }
    return nativesCssTextPromise
  }
  /**
   * Met à jour l'état actif dans la sidebar (aria-current)
   */
  function updateActiveSidebarLink(componentName) {
    // Gère les liens de composants
    const componentLinks = document.querySelectorAll(
      ".sidebar a[data-component-id]",
    )
    componentLinks.forEach((a) => {
      if (a.getAttribute("data-component-id") === componentName) {
        a.setAttribute("aria-current", "page")
      } else {
        a.removeAttribute("aria-current")
      }
    })

    // Gère les liens de pages
    const pageLinks = document.querySelectorAll(".sidebar a[data-page]")
    pageLinks.forEach((a) => {
      const pageName = a.getAttribute("data-page")
      if (componentName === `page:${pageName}`) {
        a.setAttribute("aria-current", "page")
      } else {
        a.removeAttribute("aria-current")
      }
    })

    // Marque l'accueil si aucun composant/page n'est actif
    const homeLink = document.querySelector(".sidebar a[data-home]")
    if (homeLink) {
      if (!componentName) {
        homeLink.setAttribute("aria-current", "page")
      } else {
        homeLink.removeAttribute("aria-current")
      }
    }
  }

  /**
   * Navigation côté client: clique sur la sidebar met à jour l'URL et le contenu
   */
  function setupClientSideNav() {
    const sidebar = document.querySelector(".sidebar")
    if (!sidebar) return
    sidebar.addEventListener("click", (e) => {
      const target = e.target
      // Lien Accueil (SPA): restaure la vue d'accueil sans recharger
      if (
        target instanceof HTMLAnchorElement &&
        target.hasAttribute("data-home")
      ) {
        e.preventDefault()
        const base = document.body?.getAttribute("data-base") || "/"
        const basePath = base.endsWith("/") ? base : base + "/"
        const url = new URL(basePath, window.location.origin)
        history.pushState({}, "", url.toString())
        showHome()
        return
      }
      // Lien Page (ex: lancement)
      if (target instanceof HTMLAnchorElement && target.dataset.page) {
        e.preventDefault()
        const pageName = target.dataset.page
        const base = document.body?.getAttribute("data-base") || "/"
        const basePath = base.endsWith("/") ? base : base + "/"
        const url = new URL(
          basePath + "?page=" + encodeURIComponent(pageName),
          window.location.origin,
        )
        history.pushState({ page: pageName }, "", url.toString())
        showPage(pageName)
        return
      }
      // Lien Composant
      if (target instanceof HTMLAnchorElement && target.dataset.componentId) {
        e.preventDefault()
        const id = target.dataset.componentId
        const slug = target.dataset.componentSlug || id.split("/").pop()
        const base = document.body?.getAttribute("data-base") || "/"
        const basePath = base.endsWith("/") ? base : base + "/"
        const url = new URL(
          basePath + "?element=" + encodeURIComponent(slug),
          window.location.origin,
        )
        history.pushState({ component: id }, "", url.toString())
        loadComponent(id)
      }
    })

    window.addEventListener("popstate", () => {
      const params = new URLSearchParams(window.location.search)
      const pageName = params.get("page")
      let id = params.get("component")

      // Gère les pages
      if (pageName) {
        showPage(pageName)
        return
      }

      // Gère les composants
      if (!id) {
        const path = window.location.pathname.replace(/\/$/, "")
        const last = path.split("/").pop()
        if (last && !last.endsWith(".html")) {
          const a = document.querySelector(
            `.sidebar a[data-component-slug="${CSS.escape(last)}"]`,
          )
          if (a) id = a.getAttribute("data-component-id")
        }
      }
      if (id) {
        loadComponent(id)
      } else {
        showHome()
      }
    })
  }

  /**
   * Charge un composant par son id et met à jour titres + état actif
   */
  function loadComponent(componentName) {
    const isPage = componentName.startsWith("pages/")

    if (isPage) {
      // Plus de pages éditoriales chargées dynamiquement: on revient à l'accueil
      showHome()
      return
    }

    // Composants natifs (ex: input/input)
    const htmlModuleKey = `/natives/${componentName}.html`
    const htmlContent = htmlComponentModules[htmlModuleKey]
    if (htmlContent === undefined) {
      console.error(`Contenu HTML non trouvé pour "${componentName}".`)
      return
    }

    // Remplace le <main> par le template component
    const mainEl = document.querySelector(".main")
    if (mainEl && templateMainComponent) {
      mainEl.outerHTML = templateMainComponent
    }

    // Injecte le contenu du composant
    const preview = document.querySelector(".component-preview")
    if (preview) preview.innerHTML = htmlContent

    // Met à jour le titre
    const readableComponentName = componentName
      .split("/")
      .pop()
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
    const subtitle = document.querySelector("#component-title")
    if (subtitle) subtitle.textContent = readableComponentName

    // Met à jour la description du composant
    const descriptionEl = document.querySelector(".component-description")
    if (descriptionEl) {
      const componentData = componentsData.find((c) => c.id === componentName)
      descriptionEl.textContent = componentData?.description || ""
    }

    // Initialise le bouton "Afficher le code"
    initializeShowCodeButtons()
    initializeCopyCodeButtons()

    // Ajoute le tableau des variables CSS
    const baseName = componentName.split("/").pop() || ""
    renderVariablesTable(baseName)

    // Réinitialise les modules de composants spécifiques
    reinitializeComponentModules(componentName)

    updateActiveSidebarLink(componentName)

    // Focus accessibilité sur le titre
    const subtitleEl = document.getElementById("component-title")
    if (subtitleEl) {
      subtitleEl.setAttribute("tabindex", "-1")
      subtitleEl.focus()
    }

    // Synchronise l'état inert après le chargement du composant
    // Utilise requestAnimationFrame pour s'assurer que le DOM est à jour
    requestAnimationFrame(() => {
      syncMainInertState()
    })
  }

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
    const showCodeButton = document.querySelector(".js-show-code")
    const componentPreviewContainer =
      document.querySelector(".component-preview") // Conteneur où le HTML du composant est injecté

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
        codeBlock = document.querySelector(".component-code-source")
      }

      if (codeBlock) {
        codeBlock.hidden = !codeBlock.hidden
        showCodeButton.setAttribute(
          "aria-expanded",
          (!codeBlock.hidden).toString(),
        )
        const showCodeLabel =
          showCodeButton.querySelector("span") || showCodeButton
        showCodeLabel.textContent = !codeBlock.hidden
          ? "Masquer le code"
          : "Afficher le code"

        const copyButton = document.querySelector(".js-copy-code")

        if (!codeBlock.hidden) {
          if (copyButton) copyButton.hidden = false

          // Regénère à la volée depuis le DOM actuel, en ne gardant que le code du composant
          let componentHtmlContent = ""
          const roots = componentPreviewContainer.querySelectorAll(
            "[data-component-root]",
          )
          if (roots.length) {
            componentHtmlContent = Array.from(roots)
              .map((el) => {
                // Clone le nœud et supprime l'attribut data-component-root (sur lui et ses descendants)
                const clone = el.cloneNode(true)
                if (clone instanceof Element) {
                  clone.removeAttribute("data-component-root")
                  const innerMarked = clone.querySelectorAll(
                    "[data-component-root]",
                  )
                  innerMarked.forEach((n) =>
                    n.removeAttribute("data-component-root"),
                  )
                }
                return clone.outerHTML.trim()
              })
              .join("\n\n")
          } else {
            // Fallback: aucun marqueur, on prend tout le contenu actuel
            componentHtmlContent = componentPreviewContainer.innerHTML.trim()
          }
          const formattedHtml = formatHtml(componentHtmlContent.trim())
          const she = codeBlock.querySelector("syntax-highlight.code-highlight")
          if (she) {
            // Le web component lit le texte du slot/innerText
            she.textContent = formattedHtml
            // Déclenche la (re)coloration après mise à jour du contenu
            if (typeof she.update === "function") she.update()
          } else {
            // Fallback si le composant n’est pas disponible
            const codeElement = codeBlock.querySelector("code.language-html")
            if (codeElement) codeElement.textContent = formattedHtml
          }
        } else {
          if (copyButton) copyButton.hidden = true
        }
      } else {
        // Pas de bloc code: s'assurer que le bouton reste cohérent
        showCodeButton.setAttribute("aria-expanded", "false")
      }
    })
  }

  /**
   * Initialise le bouton "Copier".
   */
  function initializeCopyCodeButtons() {
    const copyButton = document.querySelector(".js-copy-code")
    if (!copyButton) return

    // Évite les doubles bindings
    if (copyButton.dataset.bound === "true") return
    copyButton.dataset.bound = "true"

    copyButton.addEventListener("click", async () => {
      const codeBlock = document.querySelector(".component-code-source")
      if (!codeBlock) return

      const she = codeBlock.querySelector("syntax-highlight")
      const codeEl = codeBlock.querySelector("code")
      // Priorité au contenu du web component syntax-highlight
      const textToCopy = she
        ? she.textContent
        : codeEl
          ? codeEl.textContent
          : ""

      if (textToCopy) {
        const copyLabel = copyButton.querySelector("span") || copyButton
        try {
          await navigator.clipboard.writeText(textToCopy)
          const originalText = copyLabel.textContent
          copyLabel.textContent = "Copié !"
          setTimeout(() => {
            copyLabel.textContent = originalText
          }, 2000)
        } catch (err) {
          console.error("Erreur de copie :", err)
          copyLabel.textContent = "Erreur"
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

    // Découper grossièrement en lignes
    cleanHtml = cleanHtml.replace(/>/g, ">\n").replace(/</g, "\n<")
    cleanHtml = cleanHtml.replace(/\s*\n\s*/g, "\n").trim()

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

    const lines = cleanHtml.split("\n").filter(Boolean)
    const indentChar = "  "
    let indentLevel = 0
    const resultLines = []

    for (const raw of lines) {
      const line = raw.trim()
      let currentIndent = indentLevel

      if (line.startsWith("</")) {
        // Balise fermante
        indentLevel = Math.max(0, indentLevel - 1)
        currentIndent = indentLevel
      } else if (
        line.startsWith("<") &&
        line.endsWith(">") &&
        !line.startsWith("<!--") &&
        !line.startsWith("<!") &&
        !line.endsWith("/>") &&
        !/^<[^>]+>.*<\/[^>]+>$/.test(line)
      ) {
        const tagNameMatch = line.match(/^<\s*([a-z0-9-]+)/i)
        const tag = tagNameMatch ? tagNameMatch[1].toLowerCase() : ""
        if (!voidElements.has(tag)) {
          currentIndent = indentLevel
          indentLevel++
        }
      }

      resultLines.push(indentChar.repeat(currentIndent) + line)
    }

    // Première passe: indentation basique
    let pretty = resultLines.join("\n")

    // Seconde passe: compaction de certains éléments quand ils ne contiennent qu'un texte simple
    // Exemple: <li>\n  Texte\n</li> => <li>Texte</li>
    const compactTags = new Set([
      // listes/tableaux
      "li",
      "dt",
      "dd",
      "th",
      "td",
      // inlines et titres
      "a",
      "button",
      "label",
      "summary",
      "code",
      "span",
      "small",
      "output",
      "option",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
    ]) // tags autorisés en mono-ligne
    const rl = pretty.split("\n")
    const compacted = []
    for (let i = 0; i < rl.length; i++) {
      const open = rl[i]
      const openMatch = open.match(/^(\s*)<([a-z0-9-]+)([^>]*)>\s*$/i)
      if (
        openMatch &&
        i + 2 < rl.length &&
        compactTags.has(openMatch[2].toLowerCase())
      ) {
        const middle = rl[i + 1]
        const close = rl[i + 2]
        const closeRe = new RegExp(`^\\s*</${openMatch[2]}\\>\\s*$`, "i")
        const isTextOnly = /^(\s*[^<>\n\r]+\s*)$/.test(middle)
        if (closeRe.test(close) && isTextOnly) {
          const indent = openMatch[1] || ""
          const tag = openMatch[2]
          const attrs = openMatch[3] || ""
          const text = middle.trim()
          compacted.push(`${indent}<${tag}${attrs}>${text}</${tag}>`)
          i += 2
          continue
        }
      }
      compacted.push(open)
    }
    return compacted.join("\n")
  }

  // Récupère les paramètres de l'URL
  const params = new URLSearchParams(window.location.search)

  // Récupère la page depuis ?page=...
  const pageName = params.get("page")

  // Gère les pages
  if (pageName) {
    showPage(pageName)
  } else {
    // Récupère le composant depuis ?component=... ou, à défaut, depuis un slug /:slug
    let componentName = params.get("component")
    if (!componentName) {
      const elementParam = params.get("element")
      const link = document.querySelector(
        `.sidebar a[data-component-slug="${CSS.escape(elementParam)}"]`,
      )
      if (link) componentName = link.getAttribute("data-component-id")
    }
    if (!componentName) {
      const path = window.location.pathname.replace(/\/$/, "")
      const last = path.split("/").pop()
      if (last && !last.endsWith(".html")) {
        const a = document.querySelector(
          `.sidebar a[data-component-slug="${CSS.escape(last)}"]`,
        )
        if (a) componentName = a.getAttribute("data-component-id")
      }
    }

    // Fallback: si un 404.html nous a redirigés vers la base avec ?slug=...
    if (!componentName) {
      const slugParam = params.get("slug")
      if (slugParam) {
        const a = document.querySelector(
          `.sidebar a[data-component-slug="${CSS.escape(slugParam)}"]`,
        )
        if (a) componentName = a.getAttribute("data-component-id")
      }
    }

    // Si le paramètre 'component' est présent dans l'URL.
    if (componentName) {
      // Normalise l'URL pour toujours utiliser ?element=slug
      try {
        const a = document.querySelector(
          `.sidebar a[data-component-id="${CSS.escape(componentName)}"]`,
        )
        const slug = a?.getAttribute("data-component-slug")
        if (slug) {
          const base = document.body?.getAttribute("data-base") || "/"
          const basePath = base.endsWith("/") ? base : base + "/"
          const url = new URL(
            basePath + "?element=" + encodeURIComponent(slug),
            window.location.origin,
          )
          if (window.location.href !== url.toString()) {
            history.replaceState({}, "", url.toString())
          }
        }
      } catch {
        // Ignore la normalisation d'URL si indisponible
      }
      loadComponent(componentName)
    } else {
      showHome()
    }
  }

  // Active la navigation côté client
  setupClientSideNav()

  /**
   * Initialise l'état de la navigation selon la taille de l'écran
   * Desktop (>= 48rem) : opened
   * Mobile (< 48rem) : closed
   */
  function initializeNavigationState() {
    const target = document.querySelector("#main-content")
    const button = document.querySelector(".burger-button")

    if (!target) return

    // Utilise matchMedia pour détecter le breakpoint 48rem
    const isDesktop = window.matchMedia("(width >= 48rem)").matches

    if (isDesktop) {
      target.setAttribute("data-state", "opened")
      if (button) button.setAttribute("aria-expanded", "true")
    } else {
      target.setAttribute("data-state", "closed")
      if (button) button.setAttribute("aria-expanded", "false")
    }

    // Synchronise l'état inert
    syncMainInertState()
  }

  /**
   * Synchronise l'attribut inert sur <main> en fonction de l'état de la navigation
   * Sur mobile, si la navigation est ouverte, main doit être inert
   */
  function syncMainInertState() {
    const target = document.querySelector("#main-content")
    const mainElement = document.querySelector(".main")

    if (!target || !mainElement) return

    const isMobile = !window.matchMedia("(width >= 48rem)").matches
    const isNavigationOpened = target.getAttribute("data-state") === "opened"

    // Sur mobile avec navigation ouverte, main doit être inert
    if (isMobile && isNavigationOpened) {
      mainElement.setAttribute("inert", "")
    } else {
      mainElement.removeAttribute("inert")
    }
  }

  /**
   * Active le bouton burger pour le menu mobile uniquement
   * Sur desktop, la navigation reste toujours ouverte
   */
  function setupBurgerMenu() {
    const button = document.querySelector(".burger-button")
    const target = document.querySelector("#main-content")

    if (!button || !target) return

    button.addEventListener("click", () => {
      // Le toggle ne fonctionne que sur mobile
      const isMobile = !window.matchMedia("(width >= 48rem)").matches

      if (!isMobile) return // Sur desktop, ne rien faire

      const currentState = target.getAttribute("data-state")

      if (!currentState || currentState === "closed") {
        target.setAttribute("data-state", "opened")
        button.setAttribute("aria-expanded", "true")
      } else {
        target.setAttribute("data-state", "closed")
        button.setAttribute("aria-expanded", "false")
      }

      // Synchronise l'état inert
      syncMainInertState()
    })
  }

  /**
   * Ferme la navigation lors d'un clic sur un lien de navigation (mobile uniquement)
   */
  function setupNavigationClose() {
    const target = document.querySelector("#main-content")
    const navigation = document.querySelector("#navigation")
    const button = document.querySelector(".burger-button")

    if (!target || !navigation) return

    // Écoute les clics sur tous les liens de navigation
    navigation.addEventListener("click", (event) => {
      // Vérifie si l'élément cliqué est un lien de navigation
      const link = event.target.closest("a.nav-item")

      if (link) {
        // Ferme la navigation uniquement sur mobile (< 48rem)
        const isMobile = !window.matchMedia("(width >= 48rem)").matches

        if (isMobile) {
          target.setAttribute("data-state", "closed")
          if (button) button.setAttribute("aria-expanded", "false")
        }
      }
    })
  }

  // Initialise l'état de la navigation au chargement
  initializeNavigationState()

  // Active le menu burger
  setupBurgerMenu()

  // Active la fermeture de la navigation au clic sur un lien
  setupNavigationClose()

  /**
   * Rendu du tableau des variables CSS du composant (extraites de natives.css)
   * @param {string} baseName Nom simple du composant (ex: "button")
   */
  function renderVariablesTable(baseName) {
    // Nettoyer ancien tableau si présent
    const prev = document.querySelector(".component-variables")
    if (prev) prev.remove()

    // Certains composants n'exposent pas (ou pas encore) de variables utiles
    const EXCLUDED = new Set(["list"]) // masque le tableau pour "List"
    if (EXCLUDED.has(baseName)) return

    ensureNativesCssText().then((cssText) => {
      if (!cssText) return
      const prefix = `--${baseName}-`
      const vars = parseVariablesForPrefix(cssText, prefix)
      if (!vars.length) return

      const section = document.createElement("section")
      section.className = "component-variables"

      const heading = document.createElement("h2")
      heading.className = "title-m"
      heading.textContent = "Variables CSS du composant"
      section.appendChild(heading)

      const tableWrapper = document.createElement("div")
      tableWrapper.className = "table-rounded table-responsive"

      const table = document.createElement("table")
      table.innerHTML = `
        <thead>
          <tr>
            <th scope="col">variable</th>
            <th scope="col">commentaire</th>
          </tr>
        </thead>
        <tbody></tbody>
      `
      const tbody = table.querySelector("tbody")
      for (const v of vars) {
        const tr = document.createElement("tr")
        const safeName = escapeHtml(v.name)
        // Infère un libellé d'usage depuis le nom de variable
        const purpose = inferVariablePurpose(v.name)
        // Ne garde le commentaire existant que s'il n'est pas un simple héritage
        const isHeritage =
          typeof v.comment === "string" &&
          v.comment.trim().toLowerCase().startsWith("hérite de ")
        const chosenComment = purpose
          ? `${purpose}${isHeritage ? ` (${v.comment})` : ""}`
          : isHeritage
            ? ""
            : v.comment || ""
        const safeComment = escapeHtml(chosenComment)
        // Ajoute un retour chariot HTML avant la mention d'héritage si présente
        const commentWithBreak = safeComment.replace(
          /\s*\(hérite de --/gi,
          "<br>(hérite de --",
        )
        tr.innerHTML = `
          <td><code>${safeName}</code></td>
          <td>${commentWithBreak}</td>
        `
        tbody.appendChild(tr)
      }
      tableWrapper.appendChild(table)
      section.appendChild(tableWrapper)

      // Injection dans le bloc component-info
      const componentInfo = document.querySelector(".component-info")
      if (componentInfo) componentInfo.appendChild(section)
    })
  }

  /**
   * Affiche la vue d'accueil: charge le template page avec le contenu d'accueil
   */
  function showHome() {
    // Normalise l'URL vers la base si nécessaire
    const baseAttr = document.body?.getAttribute("data-base") || "/"
    const basePath = baseAttr.endsWith("/") ? baseAttr : baseAttr + "/"
    if (window.location.pathname !== basePath) {
      try {
        history.replaceState({}, "", new URL(basePath, window.location.origin))
      } catch {
        // Ignorer les erreurs d'historique (navigateurs anciens ou contexte restreint)
      }
    }

    // Charge le contenu de la page d'accueil
    const homeContent = htmlPageContentModules["/pages/accueil.html"] || ""

    // Remplace le <main> par le template page
    const mainEl = document.querySelector(".main")
    if (mainEl && templateMainPage) {
      mainEl.outerHTML = templateMainPage
    }

    // Met à jour le titre et injecte le contenu
    const subtitle = document.querySelector("#component-title")
    if (subtitle) subtitle.textContent = "Des éléments HTML bien stylés\u202F!"

    const pageContent = document.querySelector(".page-content")
    if (pageContent) pageContent.innerHTML = homeContent

    updateActiveSidebarLink("")

    // Active les contrôles de démo si présents
    setupDemoControls()

    // Focus accessibilité sur le titre
    const subtitleEl = document.getElementById("component-title")
    if (subtitleEl) {
      subtitleEl.setAttribute("tabindex", "-1")
      subtitleEl.focus()
    }

    // Synchronise l'état inert après le chargement de la page d'accueil
    requestAnimationFrame(() => {
      syncMainInertState()
    })
  } /**
   * Affiche une page (ex: installation)
   * @param {string} pageName - Nom de la page (ex: "installation")
   */
  function showPage(pageName) {
    // Construit la clé du module (ex: "/pages/installation.html")
    const pageContentKey = `/pages/${pageName}.html`
    const pageContent = htmlPageContentModules[pageContentKey]

    if (!pageContent) {
      console.error(`Page non trouvée : ${pageName}`)
      showHome()
      return
    }

    // Remplace le <main> par le template page
    const mainEl = document.querySelector(".main")
    if (mainEl && templateMainPage) {
      mainEl.outerHTML = templateMainPage
    }

    // Met à jour le titre
    const readablePageName = pageName
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
    const subtitle = document.querySelector("#component-title")
    if (subtitle) subtitle.textContent = readablePageName

    // Injecte le contenu de la page
    const pageContentEl = document.querySelector(".page-content")
    if (pageContentEl) pageContentEl.innerHTML = pageContent

    // Initialise le configurateur sur la page d'installation
    if (pageName === "installation") {
      console.log("Router: Loading NativesBundler for installation page")
      import("/assets/js/natives-bundler.js")
        .then((module) => {
          if (module.NativesBundler) {
            console.log("Router: NativesBundler found, initializing...")
            module.NativesBundler.init()
          } else {
            console.error("Router: NativesBundler export not found in module")
          }
        })
        .catch((err) => console.error("Router: Failed to load NativesBundler", err))
    }

    // Met à jour l'état actif dans la sidebar
    updateActiveSidebarLink(`page:${pageName}`)

    // Focus accessibilité sur le titre
    const subtitleEl = document.getElementById("component-title")
    if (subtitleEl) {
      subtitleEl.setAttribute("tabindex", "-1")
      subtitleEl.focus()
    }

    // Synchronise l'état inert après le chargement de la page
    requestAnimationFrame(() => {
      syncMainInertState()
    })
  }

  /**
   * Devine l'usage d'une variable CSS depuis son nom.
   * Retourne une courte description FR ou une chaîne vide si inconnu.
   * @param {string} varName
   * @param {string} baseName
   */
  function inferVariablePurpose(varName) {
    const n = String(varName).toLowerCase()
    // Spécifiques Table
    if (n === "--table-layout") return "Mode de mise en page du tableau"
    if (n === "--table-border-collapse") return "Mode de fusion des bordures"
    if (n === "--table-border-spacing")
      return "Espacement entre cellules (mode separate)"
    if (n === "--table-zebra") return "% de zebrage une rangée sur deux"
    if (n === "--table-min-width")
      return "Largeur minimale du tableau en mode responsive"
    // Spécifiques Hr
    if (n === "--hr-border-color") return "Couleur du trait"
    if (n === "--hr-border-width") return "Épaisseur du trait"
    if (n === "--hr-wave-length") return "Longueur d’un motif de vague"
    if (n === "--hr-wave-height") return "Hauteur du motif ondulé"

    // Patterns communs (du plus spécifique au plus générique)
    const patterns = [
      [/background-color-hover$/, "Couleur de fond au survol"],
      [/background-color-active$/, "Couleur de fond à l’activation"],
      [/background-color$/, "Couleur de fond"],
      [/text-color-hover$/, "Couleur du texte au survol"],
      [/text-color-active$/, "Couleur du texte à l’activation"],
      [/text-color$/, "Couleur du texte"],
      [/color-hover$/, "Couleur au survol"],
      [/color-active$/, "Couleur à l’activation"],
      [/border-color-hover$/, "Couleur de bordure au survol"],
      [/border-color-active$/, "Couleur de bordure à l’activation"],
      [/border-color$/, "Couleur de bordure"],
      [/border-radius$/, "Rayon de bordure"],
      [/border-width$/, "Épaisseur de bordure"],
      [/font-weight$/, "Graisse de police"],
      [/padding$/, "Espacement intérieur"],
      [/spacing$/, "Espacement"],
      [/size$/, "Taille"],
      [/max-width$/, "Largeur maximale"],
      [/max-height$/, "Hauteur maximale"],
      [/min-width$/, "Largeur minimale"],
      [/min-height$/, "Hauteur minimale"],
      // Range/Slider
      [/-track-color$/, "Couleur de la piste"],
      [/-track-height$/, "Hauteur de la piste"],
      [/-thumb-size$/, "Taille du curseur"],
      [/-thumb-color$/, "Couleur du curseur"],
      // Dialog
      [/^--dialog-header-padding$/, "Espacement intérieur de l’en-tête"],
      [/^--dialog-footer-padding$/, "Espacement intérieur du pied de modale"],
      // Details
      [/^--details-summary-padding$/, "Espacement intérieur du résumé (titre)"],
      [/^--details-padding$/, "Espacement intérieur du contenu"],
    ]
    for (const [re, label] of patterns) {
      if (re.test(n)) return label
    }
    // Heuristique: si le var commence par --${baseName}-color
    if (n.includes("-color")) return "Couleur"
    return ""
  }

  /**
   * Extrait les variables CSS d'un certain préfixe depuis un texte CSS
   * @param {string} cssText
   * @param {string} prefix (ex: "--button-")
   * @returns {{name:string,value:string,comment?:string}[]}
   */
  function parseVariablesForPrefix(cssText, prefix) {
    const out = []
    const seen = new Set()
    // Capture multi-ligne jusqu'au premier point-virgule
    const re = /(--[a-z0-9-]+)\s*:\s*([\s\S]*?)\s*;/gi
    let m
    while ((m = re.exec(cssText)) !== null) {
      const name = m[1]
      if (!name.startsWith(prefix)) continue
      if (seen.has(name)) continue
      let valueRaw = m[2] || ""

      // Commentaire inline éventuel
      let comment = ""
      const cm = valueRaw.match(/\/\*\s*([\s\S]*?)\s*\*\//)
      if (cm) comment = cm[1].trim()

      // Nettoyage: retirer commentaires et compacter espaces
      valueRaw = valueRaw.replace(/\/\*[\s\S]*?\*\//g, "")
      const value = valueRaw.replace(/\s+/g, " ").trim()

      // Déduire commentaire depuis var(--token, fallback)
      if (!comment) {
        const varMatch = value.match(
          /var\((--[a-z0-9-]+)(?:\s*,\s*([^)]+))?\)/i,
        )
        if (varMatch) {
          const token = varMatch[1]
          const fb = (varMatch[2] || "").trim()
          comment = `hérite de ${token}${fb ? ` (fallback: ${fb})` : ""}`
        }
      }

      out.push({ name, value, comment })
      seen.add(name)
    }
    out.sort((a, b) => a.name.localeCompare(b.name))
    return out
  }

  /**
   * Échappe quelques caractères HTML pour un rendu sûr
   */
  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;")
  }

  /**
   * Active les contrôles de personnalisation de la démo sur la page d'accueil
   */
  function setupDemoControls() {
    const radiusControl = document.getElementById("control-radius")
    const colorControl = document.getElementById("control-color")
    const borderControl = document.getElementById("control-border")
    const previewContainer = document.querySelector(".demo-preview")

    if (!radiusControl || !colorControl || !borderControl || !previewContainer) return

    // Applique les changements sur le conteneur global pour que les contrôles
    // et le formulaire adoptent les choix
    const updateStyles = () => {
      previewContainer.style.setProperty("--form-border-radius", radiusControl.value)
      previewContainer.style.setProperty("--form-accent-color", colorControl.value)
      previewContainer.style.setProperty("--form-border-width", borderControl.value)
    }

    radiusControl.addEventListener("change", updateStyles)
    colorControl.addEventListener("change", updateStyles)
    borderControl.addEventListener("change", updateStyles)

    // Applique initialement pour synchroniser l'affichage
    updateStyles()
  }

  /**
   * Initialise le commutateur de thème (clair/sombre)
   */
  function setupThemeSwitcher() {
    const button = document.querySelector(".js-theme-switcher")
    if (!button) return

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)")

    /**
     * Applique le thème choisi
     * @param {'light' | 'dark'} theme
     */
    function setTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme)
      localStorage.setItem("theme", theme)
      button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false")
    }

    // Initialisation
    const storedTheme = localStorage.getItem("theme")
    const initialTheme = storedTheme || (prefersDark.matches ? "dark" : "light")
    setTheme(initialTheme)

    // Événements
    button.addEventListener("click", () => {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark"
      setTheme(currentTheme)
    })

    prefersDark.addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light")
      }
    })
  }

  // Active les fonctionnalités globales
  setupThemeSwitcher()
  // Active les contrôles de démo si présents
  setupDemoControls()
})


