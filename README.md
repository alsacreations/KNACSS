# KNACSS

http://www.knacss.com

KNACSS, c'est une sorte de feuille de style CSS "reset" sur-vitaminée qui permet de commencer un projet à partir de zéro tout en tenant compte de bonnes pratiques générales (accessibilité, performance, responsive webdesign).

KNACSS prend en charge les styles de base, mais également la typographie, les modèles de boîte, les alignements et positionnements d'éléments, les grilles de mise en page, dans l'esprit d'être adapté à toutes les tailles d'écran (reponsive). Le tout automatiquement&nbsp;!

Conçu par l'agence web [Alsacreations.fr](http://alsacreations.fr) et pensé pour être couplé avec des préprocesseurs tel que Sass, le micro-framework KNACSS est employé quotidiennement sur toute sorte de projets web quel que soit son type ou son envergure.

## Documentation

- [**Documentation et Guide de styles**](https://knacss.com/styleguide.html)
- [**Pense-bête en PDF**](http://knacss.com/KNACSS-cheatsheet.pdf)
- Site web de présentation de KNACSS : http://knacss.com

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

Selon votre profil (débutant, utilisateur de Sass, adepte de Bower / npm / yarn), l'installation est différente.



## Comment débuter&nbsp;?

Que vous ayez opté pour la version CSS simple ou la version Sass, il est vivement conseillé de parcourir la [**documentation**](https://github.com/raphaelgoetter/KNACSS/tree/master/doc) détaillée et illustrée avant de vous jeter sur KNACSS.

Sachez qu'un [**Pense-bête en PDF**](http://knacss.com/KNACSS-cheatsheet.pdf) et un [**Guide de styles**](http://codepen.io/raphaelgoetter/full/LNwOjz/) sont également disponibles pour vous souvenir des classes utiles de KNACSS.

Dans le cas d'un usage via Sass, vos deux fichiers de travail principaux seront&nbsp;:
- le fichier `sass/_config/_variables.scss` contenant toutes les variables du projet à définir une fois pour toute au départ
- le fichier `sass/knacss.scss` qui importe tous les autres fichiers que vous risquez d'employer dans votre projet.

En phase d'intégration, il vous suffit de compiler le fichier `sass/knacss.scss` pour obtenir votre fichier CSS final.

### Mise à jour depuis une version précédente de KNACSS ?

La version `6.*.*` de KNACSS est une version majeure, ce qui implique que certaines fonctionnalités ne sont plus forcément rétro-compatibles avec les versions précédentes `5.*.*`.

Voici les principales modifications dont il faudra tenir compte lors d'une bascule vers la version 6 de KNACSS&nbsp;:

#### Modifications majeures depuis la `5.*.*`

- le grille de mise en forme a été entièrement modifiée. Détails de modifications: https://github.com/alsacreations/KNACSS/issues/207
- les positionnements tabulaires. `.row`, `.col` et `.line`, devenus inutiles et confusants depuis Flexbox, ont été supprimés
- de nouvelles valeurs de breakpoints ont été définies. Détails: https://github.com/alsacreations/KNACSS/issues/210
- suppression de l'outils *include-media* (crée des bugs d'encodage, nécessite un temps d'apprentissage, et n'apporte pas grand chose au final)

#### Modifications majeures depuis la `4.*.*`

- suppression de la version LESS (à partir de la version KNACSS 5.0, seul le préprocesseur Sass est encore pris en charge)
- suppression des fallbacks pour IE8-IE9 (à partir de la version KNACSS 5.0, seul IE10 et supérieurs sont pris en charge)
- restructuration / renommage des fichiers avec préfixes `_config-`, `_layout-`, `_library-`, `_object-`, `_override-`
- renommage des éléments de grilles : `.flex-item-double` --> `.grid-item-double` (plus cohérent)
- ajout de la library include-media (http://include-media.com/)
- grille "grillade" à présent en mobile first

#### Modifications majeures depuis la `3.*.*`

- La rétrocompatibilité n'est pas préservée pour certains noms de classes ( `.left`, `.start`, `.fl`, `.table-`, `.flex-start`, `.flex-end`)&nbsp;: `.left` ne correspond plus à un `float: left` mais à un `margin-right: auto`, il faut dorénavant employer `.fl` pour obtenir un flottant à gauche;  `.right` ne correspond plus à un `float: right` mais à un `margin-left: auto`, il faut dorénavant employer `.fr` pour obtenir un flottant à droite; `.start` et `.end` n'existent plus
- Les noms des conteneurs de grille ont changé et nécessitent systématiquement un trait d'union : ancien nommage : `.grid2`, `.grid1-3`;  nouveau nommage : `.grid-2`, `.grid-1-3`
- Les classes relatives à flexbox ont été renommées pour ne pas entrer en conflit avec des outils tels que Modernizer (qui ajoutent aux-aussi ce genre de classes). Nouveau nommage :
`.flex-container, .flex-container-h`, `.flex-container-v`, `.flex-item-fluid`, `.flex-item-center`, `.flex-item-first, .flex-item-medium, .flex-item-last`
