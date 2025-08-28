# KNACSS

Fournisseur de "Composants natifs" HTML stylés !

## Fonctionnalités

- Composants natifs HTML stylés, accessibles et responsives (button, input, textarea, select, checkbox, radio, range, switch, details, dialog, table, list…).
- CSS moderne uniquement (vanilla): resets, tokens, thèmes, custom properties, nesting, media queries modernes, Grid/Flex.
- Styleguide interactif avec prévisualisation en direct, affichage/masquage du code et coloration syntaxique (Custom Highlight API).
- Extraction automatique des variables CSS par composant et tableau de référence dans le styleguide.
- Personnalisation par variables CSS (couleurs, espaces, rayons, typos) sans toucher au HTML.
- Performance et éco‑conception: faible spécificité, peu de JS, assets légers; utilisable sans framework.
- Tooling: Vite (dev/build/preview), ES2022.

## Comment s'en servir ?

Deux usages possibles selon votre contexte.

1. Copier-coller le HTML depuis le styleguide

- Ouvrir le styleguide, choisir un composant, cliquer sur « Afficher le code » puis copier le bloc fourni (marqué par data‑component‑root).
- Inclure la feuille de styles du projet:
  - Avec Vite: importer `assets/app.css` dans votre entrée JS.
  - En statique: utiliser les CSS générées dans `public/css/` (ou le répertoire de build) dans vos pages HTML.
- Personnaliser le rendu en surchargeant les variables CSS (dans `:root` ou un wrapper):

```css
:root {
  /* Couleurs */
  --color-primary-500: #2563eb;
  --color-gray-900: #0f172a;
  /* Typo et rythmes */
  --text-m: 1rem;
  --leading-28: 1.75rem;
  /* Rayons et espacements */
  --radius-8: 8px;
  --spacing-16: 1rem;
}
```

1. Travailler localement avec le dépôt

- Prérequis: Node 20+ (ou récent), un gestionnaire de paquets (pnpm recommandé).
- Installer et lancer:

```sh
pnpm install
pnpm dev      # serveur de dev
pnpm build    # build de production
pnpm preview  # prévisualisation du build
```

Notes d’usage

- La plupart des composants fonctionnent sans JavaScript. Certains proposent un JS optionnel (ex: dialog, textarea avec compteur). Référez‑vous au dossier du composant pour l’activer si besoin.
- Accessibilité: conservez la sémantique native (labels, attributs requis, aria‑\* le cas échéant). Les styles n’entravent pas la navigation clavier.
- Theming: modifiez vos tokens via vos propres variables CSS; aucune dépendance à un framework CSS.

## Styleguide

Le styleguide adopte un layout modulaire rendu via templates (build-time):

- Dossiers: `templates/` (Handlebars), `templates/partials/` (header, sidebar, footer), `templates/context.json` (métadonnées de page), `assets/data/components.json` (liste des composants de nav)
- Sortie: `natives/styleguide.html`
- L’injection des démos reste côté client via `assets/js/styleguide.js` et `import.meta.glob("/natives/**/*.html")`.

Intégration plugin (à valider): ajout d’un plugin Handlebars dans Vite pour compiler les templates au build; aucune dépendance ajoutée tant que non validée.

## Coloration syntaxique du code (Custom Highlight API)

La coloration du code affiché dans le styleguide repose sur l’API CSS Custom Highlight et le web component `<syntax-highlight>` (package `syntax-highlight-element`).

### Installation

- Dépendance npm:
  - `syntax-highlight-element` (v1.x)
  - Déjà ajouté dans `package.json`.

### Configuration Vite (target ES2022)

`syntax-highlight-element` utilise un top‑level `await`. Pour éviter une erreur de build, le projet est configuré pour cibler ES2022 côté esbuild et build:

- Dans `vite.config.js`:
  - `esbuild.target = "es2022"`
  - `optimizeDeps.esbuildOptions.target = "es2022"`
  - `build.target = "es2022"`

### Imports globaux

- Fichier: `assets/main.js`
  - `import "syntax-highlight-element"`
  - `import "syntax-highlight-element/themes/prettylights.css"`

Le thème `prettylights` applique les couleurs via `::highlight()`; vous pouvez changer de thème ou créer le vôtre.

### Marquage HTML

- Le bloc de code du styleguide utilise le web component:
  - `<syntax-highlight language="html" class="code-highlight"> </syntax-highlight>`
  - Un nœud texte initial est présent (espace) pour garantir que l’API crée des `Range` sur un `firstChild`.

### Injection du code et mise à jour

- Fichier: `assets/js/styleguide.js`
  - Lors du clic sur “Afficher le code”, le HTML du composant est sérialisé, formaté, puis injecté:
    - `she.textContent = formattedHtml`
    - `she.update()` est appelé si disponible pour déclencher (ou re‑déclencher) la coloration.
  - Fallback: si le web component n’est pas disponible, le code est inséré dans `<code class="language-html">`.

### Accessibilité

- Le conteneur de code reste un region ARIA avec `aria-label`.
- Le web component expose un rôle `code` via `ElementInternals`.

### Personnalisation

- Thème: surchargez les variables CSS du thème (ex. couleurs `--prettylights-*`) ou importez un autre thème.
- Langage: ajustez l’attribut `language` (`html|css|js`).
- Compaction d’affichage: le formateur compactera certains éléments en une ligne (ex: `li`, `a`, `button`, titres…) si leur contenu est un texte simple.
