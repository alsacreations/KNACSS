/**
 * Natives Bundler
 * Gère l'analyse de natives.css et le téléchargement de versions personnalisées.
 */

export const NativesBundler = {
  cssContent: null,
  blocks: [],
  containerId: "natives-bundler-ui",

  // Ordre de priorité pour l'affichage (Formulaires à la fin)
  // Les clés doivent correspondre aux noms trouvés dans les commentaires CSS (sans casse)
  categories: {
    standard: [
      "Button et liens-boutons",
      "Details (disclosure)",
      "Dialog (modale)",
      "Hr (séparateur)",
      "Table",
    ],
    form: [
      "Input",
      "Textarea",
      "Select",
      "Checkbox",
      "Radio",
      "Switch",
      "Range",
    ],
  },

  // Mapping pour nettoyer les noms affichés
  labels: {
    "Button et liens-boutons": "Button",
    "Details (disclosure)": "Details",
    "Dialog (modale)": "Dialog",
    "Hr (séparateur)": "Hr",
    "Table": "Table",
    "Input": "Input",
    "Textarea": "Textarea",
    "Select": "Select",
    "Checkbox": "Checkbox",
    "Radio": "Radio",
    "Switch": "Switch",
    "Range": "Range"
  },

  async init() {
    console.log("NativesBundler: init() called")
    const container = document.getElementById(this.containerId)
    if (!container) {
      console.warn(`NativesBundler: Container #${this.containerId} not found`)
      return
    }

    // Évite de recharger si déjà fait
    if (container.querySelector(".component-list-form")) {
      console.log("NativesBundler: Container already populated")
      return
    }

    // On vide le conteneur (enlève les commentaires/espaces du HTML)
    container.innerHTML = ""

    try {
      if (!this.cssContent) {
        await this.fetchCss()
      }
      this.parseCss()
      this.renderUI(container)
    } catch (err) {
      console.error("Erreur NativesBundler:", err)
      container.innerHTML = `<p style="color:var(--error)">Impossible de charger le configurateur (voir console).</p>`
    }
  },

  async fetchCss() {
    // Tentative de récupération depuis le dossier public (comme le lien de téléchargement)
    const currentUrl = "/css/natives.css"
    console.log(`NativesBundler: Fetching CSS from ${currentUrl}`)
    const response = await fetch(currentUrl)
    if (!response.ok) throw new Error(`Fetch failed for ${currentUrl}: ${response.status}`)
    this.cssContent = await response.text()
    console.log(`NativesBundler: CSS fetched, length: ${this.cssContent.length}`)
  },

  parseCss() {
    this.blocks = []
    const headerEndIndex = this.cssContent.indexOf("*/", this.cssContent.indexOf("/*")) + 2
    // Le header global du fichier
    this.fileHeader = this.cssContent.substring(0, headerEndIndex)

    // Regex pour trouver les blocs délimités
    // Format complet :
    // /* --------------------
    //  * Nom
    //  * -------------------- */
    // Format simplifié (Formulaires) :
    // /* Nom
    //  * -------------------- */
    // Modification: le bloc tiret du haut est optionnel (?:...)?
    const blockRegex = /\/\* (?:-+\s*\n\s*\*\s*)?(.+?)\s*\n\s*\*?\s*(-+)\s*\*\//g

    let match

    // On parcourt tous les headers de section
    const foundHeaders = []
    while ((match = blockRegex.exec(this.cssContent)) !== null) {
      console.log(`NativesBundler: Found block "${match[1]}"`)
      foundHeaders.push({
        name: match[1].trim(),
        startIndex: match.index,
        contentStartIndex: match.index + match[0].length
      })
    }

    console.log(`NativesBundler: Total headers found: ${foundHeaders.length}`)

    // On construit les blocs
    for (let i = 0; i < foundHeaders.length; i++) {
      const current = foundHeaders[i]
      const next = foundHeaders[i + 1]

      // La fin du contenu est le début du header suivant, ou la fin du fichier
      const endIndex = next ? next.startIndex : this.cssContent.length

      const content = this.cssContent.substring(current.startIndex, endIndex)

      // On ignore le bloc conteneur "Formulaires" qui ne contient que du commentaire
      if (current.name.toLowerCase().startsWith("formulaires")) continue

      this.blocks.push({
        id: current.name, // Sera utilisé pour identifier le bloc
        name: current.name, // Nom brut du fichier CSS
        content: content
      })
    }
  },

  renderUI(container) {
    const formEl = document.createElement("form")
    formEl.className = "component-list-form"
    formEl.addEventListener("submit", (e) => {
      e.preventDefault()
      this.downloadSubset(formEl)
    })

    const listWrapper = document.createElement("div")
    listWrapper.className = "grid-list"
    listWrapper.style.display = "grid"
    listWrapper.style.gridTemplateColumns = "repeat(auto-fill, minmax(140px, 1fr))"
    listWrapper.style.gap = "1rem"
    listWrapper.style.marginBottom = "1.5rem"

    // Ordonnancement :
    // 1. Ceux qui sont dans 'standard'
    // 2. Ceux qui sont dans 'form'
    // 3. Les autres (fallback)

    const sortedBlocks = [...this.blocks].sort((a, b) => {
      const catA = this.getCategory(a.name)
      const catB = this.getCategory(b.name)

      if (catA !== catB) {
        // 'standard' (0) avant 'form' (1) avant 'unknown' (2)
        const score = (cat) => (cat === 'standard' ? 0 : cat === 'form' ? 1 : 2)
        return score(catA) - score(catB)
      }
      return a.name.localeCompare(b.name)
    })

    sortedBlocks.forEach(block => {
      const label = document.createElement("label")
      label.style.display = "flex"
      label.style.alignItems = "center"
      label.style.gap = "0.5rem"
      label.style.cursor = "pointer"

      const input = document.createElement("input")
      input.type = "checkbox"
      input.name = "component"
      input.value = block.id

      // Par défaut : coché sauf si c'est un formulaire
      const category = this.getCategory(block.name)
      input.checked = category !== 'form'

      const span = document.createElement("span")
      span.textContent = this.labels[block.name] || block.name

      label.appendChild(input)
      label.appendChild(span)
      listWrapper.appendChild(label)
    })

    const btn = document.createElement("button")
    btn.type = "submit"
    btn.className = "btn btn-primary"
    btn.textContent = "Télécharger natives-subset.css"

    formEl.appendChild(listWrapper)
    formEl.appendChild(btn)
    container.appendChild(formEl)
  },

  getCategory(name) {
    // Normalisation pour correspondre aux clés
    if (this.categories.standard.includes(name)) return 'standard'
    if (this.categories.form.includes(name)) return 'form'
    // Gestion particulière pour Dialog avec la faute de frappe ou variation
    if (name.includes("Dialog")) return 'standard'
    if (name.includes("Button")) return 'standard'
    if (name.includes("Separateur") || name.includes("séparateur")) return 'standard'
    return 'unknown'
  },

  downloadSubset(formEl) {
    const formData = new FormData(formEl)
    const selectedIds = formData.getAll("component")

    if (selectedIds.length === 0) {
      alert("Veuillez sélectionner au moins un composant.")
      return
    }

    let finalCss = this.fileHeader + "\n"

    // Ajoute les blocs sélectionnés
    // On conserve l'ordre du fichier d'origine pour la cohérence
    this.blocks.forEach(block => {
      if (selectedIds.includes(block.id)) {
        finalCss += block.content
      }
    })

    const blob = new Blob([finalCss], { type: "text/css" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "natives-subset.css"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
}
