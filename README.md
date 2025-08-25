# KNACSS Phoenix

On reprend à zéro le projet KNACSS Phoenix, qui est une refonte complète de KNACSS.

Framework de début de projet, via un workflow Vite :

1. Un bloc "Foundations" (constitué de nos resets CSS + layouts CSS + Tokens). Les Tokens seraient nos valeurs de spacing, font-size, colors, etc. L'outil Palette serait intégré pour générer les palettes de couleurs ainsi que les tokens de couleurs
2. Un bloc de "Composants natifs" HTML : buttons, inputs, checkbox, radio, details, etc. (très inspiré des [styles natifs de webawesome](https://backers.webawesome.com/docs/native/))
3. Un "Styleguide" interactif présenterait les layouts et composants (valeurs modifiables pour les espaces, arrondis, couleurs, etc.)

## Styleguide (refonte templates)

Le styleguide adopte un layout modulaire rendu via templates (build-time):

- Dossiers: `templates/` (Handlebars), `templates/partials/` (header, sidebar, footer), `templates/context.json` (métadonnées de page), `assets/data/components.json` (liste des composants de nav)
- Sortie: `natives/styleguide.html`
- L’injection des démos reste côté client via `assets/js/styleguide.js` et `import.meta.glob("/natives/**/*.html")`.

Intégration plugin (à valider): ajout d’un plugin Handlebars dans Vite pour compiler les templates au build; aucune dépendance ajoutée tant que non validée.
