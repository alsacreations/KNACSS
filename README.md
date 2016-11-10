# KNACSS

http://www.knacss.com

KNACSS, c'est une sorte de feuille de style CSS "reset" sur-vitaminée qui permet de commencer un projet à partir de zéro tout en tenant compte de bonnes pratiques générales (accessibilité, performance, responsive webdesign).

KNACSS prend en charge les styles de base, mais également la typographie, les modèles de boîte, les alignements et positionnements d'éléments, les grilles de mise en page, dans l'esprit d'être adapté à toutes les tailles d'écran (reponsive). Le tout automatiquement&nbsp;!

Conçu par l'agence web [Alsacreations.fr](http://alsacreations.fr) et pensé pour être couplé avec des préprocesseurs tel que Sass, le micro-framework KNACSS est employé quotidiennement sur toute sorte de projets web quel que soit son type ou son envergure.

## Compatibilité

KNACSS est - dans sa grande majorité - compatible avec l'ensemble des navigateurs desktop et mobiles à partir d'IE10 inclus.

## Installation

Selon votre profil (débutant, utilisateur de Sass, adepte de Bower / npm / yarn), l'installation est différente.

### Vous êtes débutant ou pressé&nbsp;?

La version courte est "il n'y a rien à installer".

KNACSS n'est constitué que d'un seul fichier CSS (minifié ou non selon vos goûts)&nbsp;:

- en version [CSS classique et lisible](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/css/knacss-unminified.css)
- ou en [version minifiée](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/css/knacss.css)

Si vous ne comptez pas décortiquer le fichier CSS, il est préférable d'opter pour la version minifiée, plus légère.
Il vous suffit ensuite de l'insérer à votre page HTML, avant votre propre feuille de style, bien entendu&nbsp;:

```HTML
<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Vive les knacks!</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
  <link rel="stylesheet" href="css/knacss.css">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

</body>
</html>
```

### Vous préférez Sass&nbsp;?

KNACSS est conçu et pensé pour être adapté au préprocesseur Sass. Nos fichiers de travail sont donc par défaut plutôt des `.scss` et non des `.css`.

Si, comme nous, vous intégrez à l'aide de préprocesseurs, KNACSS va vous faciliter la vie dès le début du projet puisqu'un [dossier de configuration](https://github.com/alsacreations/KNACSS/tree/v6/sass/_config) contenant toutes les variables du projet, les breakpoints et les mixins est intégré.
Libre à vous de modifier ces fichiers selon les contraintes de votre projet.

La version Sass, à compiler par vos soins, sera bien évidemment plus malléable grâce à l'apport de variables et fonctions.
Vous pouvez également inclure ou non les fichiers partiels qui vous intéressent (tableaux, formulaires, grilles, WordPress, classes utilitaires, etc.).

Téléchargez [KNACSS complet](https://github.com/alsacreations/KNACSS/archive/master.zip) pour bénéficier de toute l'architecture de l'outil, avec les fichiers Sass, package.json et gulpfile.js si nécessaires.

### Installation via Bower, npm ou yarn

- via [Bower](http://bower.io/) : `bower install knacss`
- via [npm](https://www.npmjs.com/) : `npm install knacss`
- via [yarn](https://yarnpkg.com/) : `yarn install knacss` ou `yarn add knacss`

**Attention**, si vous importez KNACSS automatiquement via Bower, npm ou yarn (par exemple dans un dossier `vendor` ou `node_modules`), les fichiers de configuration (variables par exemple) risquent d'être écrasés à chaque mise à jour de KNACSS. **Nous vous invitons à en faire une copie dans votre dossier de travail et à commenter l'appel au fichier de config de `vendor`**.


## Comment débuter&nbsp;?

Que vous ayez opté pour la version CSS simple ou la version Sass, il est vivement conseillé de parcourir la [**documentation**](https://github.com/raphaelgoetter/KNACSS/tree/master/doc) détaillée et illustrée avant de vous jeter sur KNACSS.

Sachez qu'un [**Pense-bête en PDF**](http://knacss.com/KNACSS-cheatsheet.pdf) et un [**Guide de styles**](http://codepen.io/raphaelgoetter/full/LNwOjz/) sont également disponibles pour vous souvenir des classes utiles de KNACSS.

Dans le cas d'un usage via Sass, vos deux fichiers de travail principaux seront&nbsp;:
- le fichier `sass/_config/_variables.scss` contenant toutes les variables du projet à définir une fois pour toute au départ
- le fichier `sass/knacss.scss` qui importe tous les autres fichiers que vous risquez d'employer dans votre projet.

En phase d'intégration, il vous suffit de compiler le fichier `sass/knacss.scss` pour obtenir votre fichier CSS final.



### Préfixes navigateurs

Certaines fonctionnalités avancées de KNACSS nécessitent d'employer toute une panoplie de préfixes CSS (`-webkit-`, `-moz-`, `-ms-`, &hellip;) pour être certain que les propriétés CSS fonctionneront partout.

Au sein de la version classique CSS de KNACSS, l'ensemble des préfixes est présent, **vous n'avez donc pas à vous en soucier** (Autoprefixer réglé à "last 2 versions").

**Par contre, dans la version Sass de KNACSS, les préfixes n'apparaissent pas** pour ne pas polluer la lecture du fichier de travail. **Il vous sera donc nécessaire de les ajouter**, de préférence automatiquement grâce à un plugin ou à l'excellent outil qu'est [autoprefixer](https://github.com/postcss/autoprefixer).

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

### Utilisateur de SPIP ?

Le CMS SPIP impose une classe générique `.fr` sur l'élément `<html>`, or cette classe est également employée pour les positionnements flottants dans KNACSS.

Si vous êtes un utilisateur de SPIP, nous vous conseillons de modifier les fichiers CSS de KNACSS et de remplacer les classes `.fr` et `.fl` par `:not(html) .fr` et `:not(html) .fl`

## Liens utiles

* Site web de KNACSS : http://knacss.com
* [**Documentation détaillée**](https://github.com/raphaelgoetter/KNACSS/tree/master/doc)
* Sur Alsacreations.com : ["découverte du framework KNACSS"](http://www.alsacreations.com/tuto/lire/1577-decouverte-du-framework-css-KNACSS.html)
