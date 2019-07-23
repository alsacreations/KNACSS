# KNACSS

<http://www.knacss.com>

KNACSS, c'est une sorte de feuille de style CSS "reset" sur-vitaminée qui permet de commencer un projet à partir de zéro tout en tenant compte de bonnes pratiques générales (accessibilité, performance, responsive webdesign, grille de mise en forme).

Conçu par l'agence web [Alsacreations.fr](http://alsacreations.fr) et pensé pour être couplé avec des préprocesseurs tel que Sass, le micro-framework KNACSS est employé quotidiennement sur toute sorte de projet web quel que soit son type ou son envergure.

## Documentation

- [**Documentation et Guide de styles**](https://www.knacss.com/doc.html)
- [**Pense-bête en PDF**](https://www.knacss.com/assets/pdf/knacss7-cheatsheet.pdf)
- Site web de présentation de KNACSS : <http://knacss.com>

## Fonctionnalités

- reset
- typographie
- Responsive
- grille de mise en forme
- composants (formulaires, tableaux, boutons, flèches, onglets, checkbox, radio et bouton "switch" stylés)
- variables et mixin Sass

## Compatibilité

KNACSS est - dans sa grande majorité - compatible avec l'ensemble des navigateurs desktop et mobiles à partir d'IE10 inclus. Pour les détails, se référer à la documentation.

## Installation

Voir la documentation.

## Mise à jour depuis une version précédente de KNACSS

La version `8.*.*` de KNACSS est une version majeure, ce qui implique que certaines fonctionnalités ne sont plus forcément rétro-compatibles avec les versions précédentes.

Voici les principales modifications dont il faudra tenir compte lors d'une mise à jour&nbsp;:

### Modifications majeures entre la v8 et la v7

*En cours&nbsp;!* Voir [#307](https://github.com/alsacreations/KNACSS/issues/307).

### Modifications majeures entre la v7 et la v6

- architecture globale revisitée (vendor, config, library, components)
- variables de projet modifiées et renommées
- refonte complète du système de grille (dorénavant basé sur Grid Layout)
- déplacement des variables de gouttières de grillade.scss vers variables.scss
- déplacement des variables de breakpoints de breakpoints.scss vers variables.scss

Pour tous détails, voir le fichier Changelog.

### Modifications majeures entre la v6 et la v5

- la grille de mise en forme a été entièrement modifiée. Détails de modifications: <https://github.com/alsacreations/KNACSS/issues/207>
- les positionnements tabulaires. `.row`, `.col` et `.line`, devenus inutiles et confusants depuis Flexbox, ont été supprimés
- de nouvelles valeurs de breakpoints ont été définies. Détails: <https://github.com/alsacreations/KNACSS/issues/210>
- suppression de l'outil *include-media* (crée des bugs d'encodage, nécessite un temps d'apprentissage, et n'apporte pas grand chose au final)

### Modifications majeures entre la v5 et la v4

- suppression de la version LESS (à partir de la version KNACSS 5.0, seul le préprocesseur Sass est encore pris en charge)
- suppression des fallbacks pour IE8-IE9 (à partir de la version KNACSS 5.0, seul IE10 et supérieurs sont pris en charge)
- restructuration / renommage des fichiers avec préfixes `_config-`, `_layout-`, `_library-`, `_object-`, `_override-`
- renommage des éléments de grilles : `.flex-item-double` --> `.grid-item-double` (plus cohérent)
- ajout de la library include-media (<http://include-media.com/>)
- grille "grillade" à présent en mobile first

### Modifications majeures entre la v4 et la v3

- La rétrocompatibilité n'est pas préservée pour certains noms de classes ( `.left`, `.start`, `.fl`, `.table-`, `.flex-start`, `.flex-end`)&nbsp;: `.left` ne correspond plus à un `float: left` mais à un `margin-right: auto`, il faut dorénavant employer `.fl` pour obtenir un flottant à gauche;  `.right` ne correspond plus à un `float: right` mais à un `margin-left: auto`, il faut dorénavant employer `.fr` pour obtenir un flottant à droite; `.start` et `.end` n'existent plus
- Les noms des conteneurs de grille ont changé et nécessitent systématiquement un trait d'union : ancien nommage : `.grid2`, `.grid1-3`;  nouveau nommage : `.grid-2`, `.grid-1-3`
- Les classes relatives à flexbox ont été renommées pour ne pas entrer en conflit avec des outils tels que Modernizer (qui ajoutent aux-aussi ce genre de classes). Nouveau nommage : `.flex-container, .flex-container-h`, `.flex-container-v`, `.flex-item-fluid`, `.flex-item-center`, `.flex-item-first, .flex-item-medium, .flex-item-last`
