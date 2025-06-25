/**
 * Module Dialog (Modale)
 * Gestion des modales HTML5 <dialog> avec accessibilité et interactions clavier
 */

// Configuration du module
const CONFIG = {
  selectors: {
    trigger: ".js-dialog-trigger", // Boutons qui ouvrent les modales
    close: ".js-dialog-close", // Boutons qui ferment les modales
    dialog: "dialog", // Élément dialog
  },
  attributes: {
    dialogId: "data-dialog", // Attribut contenant l'ID de la modale à ouvrir
  },
  classes: {
    noScroll: "no-scroll", // Classe pour désactiver le scroll du body
  },
}

// Variable pour éviter les initialisations multiples
let isInitialized = false

/**
 * Initialise le module Dialog
 */
function initDialogs() {
  console.log("🎭 Initialisation du module Dialog")

  // Nettoie les écouteurs précédents si besoin
  if (isInitialized) {
    cleanupPreviousListeners()
  }

  // Attache les écouteurs pour les boutons d'ouverture
  attachTriggerListeners()

  // Attache les écouteurs pour les boutons de fermeture
  attachCloseListeners()

  // Attache les écouteurs globaux (clavier, backdrop) seulement la première fois
  if (!isInitialized) {
    attachGlobalListeners()
  }

  isInitialized = true
}

/**
 * Nettoie les écouteurs précédents pour éviter les doublons
 */
function cleanupPreviousListeners() {
  // Supprime les écouteurs des anciens boutons trigger
  const oldTriggers = document.querySelectorAll(CONFIG.selectors.trigger)
  oldTriggers.forEach((trigger) => {
    trigger.removeEventListener("click", handleTriggerClick)
  })

  // Supprime les écouteurs des anciens boutons close
  const oldCloseButtons = document.querySelectorAll(CONFIG.selectors.close)
  oldCloseButtons.forEach((button) => {
    button.removeEventListener("click", handleCloseClick)
  })
}

/**
 * Attache les écouteurs aux boutons d'ouverture des modales
 */
function attachTriggerListeners() {
  const triggers = document.querySelectorAll(CONFIG.selectors.trigger)

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", handleTriggerClick)
  })

  console.log(`📝 ${triggers.length} bouton(s) d'ouverture de modale trouvé(s)`)
}

/**
 * Attache les écouteurs aux boutons de fermeture des modales
 */
function attachCloseListeners() {
  const closeButtons = document.querySelectorAll(CONFIG.selectors.close)

  closeButtons.forEach((button) => {
    button.addEventListener("click", handleCloseClick)
  })

  console.log(`❌ ${closeButtons.length} bouton(s) de fermeture trouvé(s)`)
}

/**
 * Attache les écouteurs globaux pour le clavier et le backdrop
 */
function attachGlobalListeners() {
  // Écoute les clics sur le backdrop (fermeture par clic extérieur)
  document.addEventListener("click", handleBackdropClick)

  // Écoute la touche Échap pour fermer les modales
  document.addEventListener("keydown", handleKeyDown)
}

/**
 * Gère le clic sur un bouton d'ouverture de modale
 * @param {Event} event - L'événement de clic
 */
function handleTriggerClick(event) {
  const trigger = event.currentTarget
  const dialogId = trigger.getAttribute(CONFIG.attributes.dialogId)

  if (!dialogId) {
    console.warn("⚠️ Aucun ID de modale spécifié dans data-dialog")
    return
  }

  const dialog = document.getElementById(dialogId)

  if (!dialog) {
    console.warn(`⚠️ Modale avec l'ID "${dialogId}" introuvable`)
    return
  }

  openDialog(dialog, trigger)
}

/**
 * Gère le clic sur un bouton de fermeture de modale
 * @param {Event} event - L'événement de clic
 */
function handleCloseClick(event) {
  const closeButton = event.currentTarget
  const dialog = closeButton.closest(CONFIG.selectors.dialog)

  if (dialog) {
    closeDialog(dialog)
  }
}

/**
 * Gère les clics sur le backdrop (fermeture par clic extérieur)
 * @param {Event} event - L'événement de clic
 */
function handleBackdropClick(event) {
  // Vérifie si on clique directement sur l'élément dialog (pas sur son contenu)
  if (event.target.tagName === "DIALOG") {
    closeDialog(event.target)
  }
}

/**
 * Gère les interactions clavier
 * @param {Event} event - L'événement clavier
 */
function handleKeyDown(event) {
  // Fermeture avec la touche Échap
  if (event.key === "Escape") {
    const openDialog = document.querySelector("dialog[open]")
    if (openDialog) {
      closeDialog(openDialog)
    }
  }
}

/**
 * Ouvre une modale
 * @param {HTMLDialogElement} dialog - L'élément dialog à ouvrir
 * @param {HTMLElement} trigger - L'élément qui a déclenché l'ouverture
 */
function openDialog(dialog, trigger) {
  // Stocke la référence au déclencheur pour le focus de retour
  dialog.dataset.trigger = trigger.id || generateUniqueId("trigger")
  if (!trigger.id) {
    trigger.id = dialog.dataset.trigger
  }

  // Ouvre la modale
  dialog.showModal()

  // Désactive le scroll du body
  document.body.classList.add(CONFIG.classes.noScroll)

  // Focus sur le premier élément focusable ou le bouton de fermeture
  focusFirstElement(dialog)

  // Piège le focus dans la modale
  trapFocus(dialog)

  console.log(`✅ Modale "${dialog.id}" ouverte`)
}

/**
 * Ferme une modale
 * @param {HTMLDialogElement} dialog - L'élément dialog à fermer
 */
function closeDialog(dialog) {
  // Ferme la modale
  dialog.close()

  // Réactive le scroll du body
  document.body.classList.remove(CONFIG.classes.noScroll)

  // Retourne le focus au déclencheur
  returnFocusToTrigger(dialog)

  console.log(`❌ Modale "${dialog.id}" fermée`)
}

/**
 * Met le focus sur le premier élément focusable de la modale
 * @param {HTMLDialogElement} dialog - L'élément dialog
 */
function focusFirstElement(dialog) {
  const focusableElements = getFocusableElements(dialog)

  if (focusableElements.length > 0) {
    focusableElements[0].focus()
  } else {
    // Si aucun élément focusable, focus sur la modale elle-même
    dialog.focus()
  }
}

/**
 * Retourne le focus au déclencheur après fermeture
 * @param {HTMLDialogElement} dialog - L'élément dialog
 */
function returnFocusToTrigger(dialog) {
  const triggerId = dialog.dataset.trigger
  if (triggerId) {
    const trigger = document.getElementById(triggerId)
    if (trigger) {
      trigger.focus()
    }
  }
}

/**
 * Piège le focus dans la modale (Tab et Shift+Tab)
 * @param {HTMLDialogElement} dialog - L'élément dialog
 */
function trapFocus(dialog) {
  const focusableElements = getFocusableElements(dialog)

  if (focusableElements.length === 0) return

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  const handleTabKey = (event) => {
    if (event.key !== "Tab") return

    if (event.shiftKey) {
      // Shift + Tab (navigation arrière)
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    } else {
      // Tab (navigation avant)
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }

  // Supprime l'ancien écouteur s'il existe
  if (dialog.focusTrapHandler) {
    dialog.removeEventListener("keydown", dialog.focusTrapHandler)
  }

  // Ajoute le nouvel écouteur
  dialog.focusTrapHandler = handleTabKey
  dialog.addEventListener("keydown", handleTabKey)
}

/**
 * Récupère tous les éléments focusables dans un conteneur
 * @param {HTMLElement} container - Le conteneur
 * @returns {HTMLElement[]} - Liste des éléments focusables
 */
function getFocusableElements(container) {
  const focusableSelectors = [
    "button:not([disabled])",
    "input:not([disabled])",
    "textarea:not([disabled])",
    "select:not([disabled])",
    "a[href]",
    '[tabindex]:not([tabindex="-1"])',
    "details",
    "summary",
  ].join(", ")

  return Array.from(container.querySelectorAll(focusableSelectors)).filter(
    (element) => {
      // Exclut les éléments cachés
      return (
        element.offsetWidth > 0 &&
        element.offsetHeight > 0 &&
        window.getComputedStyle(element).visibility !== "hidden"
      )
    },
  )
}

/**
 * Génère un ID unique
 * @param {string} prefix - Préfixe pour l'ID
 * @returns {string} - ID unique
 */
function generateUniqueId(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Auto-initialisation quand le DOM est prêt (sauf dans le styleguide)
if (!window.location.pathname.includes("/styleguide.html")) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDialogs)
  } else {
    initDialogs()
  }
}

// Export pour utilisation modulaire
export { initDialogs, openDialog, closeDialog }
