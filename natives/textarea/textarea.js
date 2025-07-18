/**
 * Gestion du compteur de caractères pour les textarea avec maxlength
 * Made par Alsacréations
 */

/**
 * Configuration du module de compteur de caractères
 */
const characterCounterConfig = {
  // Sélecteur pour les textarea avec compteur
  selector: "textarea[data-character-counter]",
  // Classes CSS pour les états du compteur
  warningClass: "warning",
  dangerClass: "danger",
  // Seuils en pourcentage pour les états d'alerte
  warningThreshold: 80, // 80% de la limite
  dangerThreshold: 95, // 95% de la limite
}

/**
 * Initialise le compteur de caractères pour un textarea
 * @param {HTMLTextAreaElement} textarea - L'élément textarea
 */
function initializeCharacterCounter(textarea) {
  const maxLength = parseInt(textarea.getAttribute("maxlength"), 10)

  if (!maxLength) {
    console.warn(
      "Textarea avec data-character-counter doit avoir un attribut maxlength",
      textarea,
    )
    return
  }

  // Trouve le compteur associé via aria-describedby
  const describedBy = textarea.getAttribute("aria-describedby")
  if (!describedBy) {
    console.warn(
      "Textarea avec data-character-counter doit avoir aria-describedby",
      textarea,
    )
    return
  }

  // Cherche l'élément compteur parmi les IDs dans aria-describedby
  const counterIds = describedBy.split(" ")
  let counterElement = null

  for (const id of counterIds) {
    const element = document.getElementById(id)
    if (element && element.classList.contains("character-counter")) {
      counterElement = element
      break
    }
  }

  if (!counterElement) {
    console.warn(
      "Aucun élément .character-counter trouvé via aria-describedby",
      textarea,
    )
    return
  }

  /**
   * Met à jour le compteur de caractères
   */
  function updateCounter() {
    const currentLength = textarea.value.length
    const remaining = maxLength - currentLength
    const percentageUsed = (currentLength / maxLength) * 100

    // Texte du compteur
    let counterText
    if (remaining === 0) {
      counterText = "Limite atteinte"
    } else if (remaining === 1) {
      counterText = "1 caractère restant"
    } else {
      counterText = `${remaining} caractères restants`
    }

    // Met à jour le texte
    counterElement.textContent = counterText

    // Gestion des classes CSS selon les seuils
    counterElement.classList.remove(
      characterCounterConfig.warningClass,
      characterCounterConfig.dangerClass,
    )

    if (percentageUsed >= characterCounterConfig.dangerThreshold) {
      counterElement.classList.add(characterCounterConfig.dangerClass)
    } else if (percentageUsed >= characterCounterConfig.warningThreshold) {
      counterElement.classList.add(characterCounterConfig.warningClass)
    }

    // Mise à jour de l'aria-label pour les lecteurs d'écran
    const ariaLabel = `${currentLength} caractères saisis sur ${maxLength} maximum. ${counterText}`
    textarea.setAttribute("aria-label", ariaLabel)

    // Annonce vocale pour les changements critiques
    if (remaining <= 10 && remaining > 0) {
      // Pour les 10 derniers caractères, on met à jour aria-live="assertive"
      counterElement.setAttribute("aria-live", "assertive")
    } else if (remaining === 0) {
      // Quand la limite est atteinte
      counterElement.setAttribute("aria-live", "assertive")
      // Optionnel : focus sur le compteur pour attirer l'attention
      setTimeout(() => {
        counterElement.setAttribute("aria-live", "polite")
      }, 2000)
    } else {
      // Retour à polite pour les autres cas
      counterElement.setAttribute("aria-live", "polite")
    }
  }

  // Écouteurs d'événements
  textarea.addEventListener("input", updateCounter)
  textarea.addEventListener("paste", () => {
    // Délai pour laisser le temps au paste de s'exécuter
    setTimeout(updateCounter, 10)
  })

  // Initialisation du compteur
  updateCounter()

  console.log(`Compteur de caractères initialisé pour ${textarea.id}`)
}

/**
 * Initialise tous les compteurs de caractères sur la page
 */
function initializeAllCharacterCounters() {
  const textareas = document.querySelectorAll(characterCounterConfig.selector)

  textareas.forEach((textarea) => {
    initializeCharacterCounter(textarea)
  })

  if (textareas.length > 0) {
    console.log(`${textareas.length} compteur(s) de caractères initialisé(s)`)
  }
}

/**
 * Auto-initialisation au chargement du DOM
 */
document.addEventListener("DOMContentLoaded", initializeAllCharacterCounters)

/**
 * Export pour utilisation externe
 */
window.CharacterCounter = {
  init: initializeAllCharacterCounters,
  initSingle: initializeCharacterCounter,
  config: characterCounterConfig,
}
