# KNACSS

http://www.knacss.com

KNACSS, c'est un peu comme une feuille de style CSS "reset" sur-vitaminée qui permet de commencer un projet à partir de zéro tout en tenant compte de bonnes pratiques générales (accessibilité, performance, responsive webdesign).

KNACSS prend en charge les styles de base, mais également la typographie, les modèles de boîte, les alignements et positionnements d'éléments, les grilles de mise en page, dans l'esprit d'être adapté à toutes les tailles d'écran (reponsive). Le tout automatiquement !

Conçu par l'agence web [Alsacreations.fr](http://alsacreations.fr) et pensé pour être couplé avec des préprocesseurs tels que LESS ou Sass, le micro-framework KNACSS est employé quotidiennement sur toute sorte de projets web quel que soit son type ou son envergure.

## Installation

La version courte est "il n'y a rien à installer".

Selon votre environnement de travail vous suffit de récupérer la feuille de styles :

- en version [CSS classique](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/css/knacss-unminified.css) (ou [minifié](vhttps://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/css/knacss.css))
- en version [Sass](https://github.com/raphaelgoetter/KNACSS/tree/master/sass)

_La version Sass sera bien évidemment plus malléable grâce à l'apport de variables et fonctions._

À noter que KNACSS est basé sur deux outils :

- [Normalize.css](http://necolas.github.io/normalize.css/), célèbre - et éprouvé - reset CSS employé par Twitter, Github, Bootstrap, Guardian, etc.
- [include-media](http://include-media.com/), mixins Sass pour la gestion des Media Queries.

## Usage

KNACSS n'est constitué que d'un seul fichier CSS (minifié ou non selon vos goûts), qu'il vous suffit d'ajouter à votre page HTML :

    <link rel="stylesheet" href="knacss.css">

Il est également possible de l'installer (toutes versions) via [Bower](http://bower.io/) : ```bower install knacss```

## Compatibilité

KNACSS est - dans sa grande majorité - compatible avec l'ensemble des navigateurs à partir d'IE10 inclus.


## RTFM!

KNACSS se veut être un outil simple (contrairement aux usines à gaz que sont Bootstrap ou Foundation), mais évolutif.
La contrepartie est que cela nécessite de votre part de bonnes connaissances en CSS et un petit effort de compréhension et de d'apprentissage des mécanismes de l'outil.

Une [**documentation**](https://github.com/raphaelgoetter/KNACSS/tree/master/doc) détaillée et illustrée est en cours de rédaction. Je vous invite vivement à la parcourir avant de vous jeter sur KNACSS.

Sachez qu'un [pense-bête en PDF](http://knacss.com/KNACSS-cheatsheet.pdf) est également disponible pour vous rappeler des classes utiles de KNACSS.

## Juste une grille ? Grillade !

KNACSS en version complète ne vous convient pas&nbsp;? Seule la grille flexbox vous intéresse&nbsp;? Bienvenue dans *Grillade* !

- en version [CSS classique](https://raw.githubusercontent.com/alsacreations/KNACSS/master/css/grillade.css) (parfaitement autonome et ne pèse que 4ko seulement&nbsp;!)
- en version [Sass](https://raw.githubusercontent.com/alsacreations/KNACSS/master/css/grillade.scss) (avec variables)

Dans tous les cas n'oubliez quand même pas de lire [la documentation](https://github.com/alsacreations/KNACSS/blob/master/doc/03-grilles.md) que l'on a concoctée rien que pour vous.


## Préprocesseurs

KNACSS est conçu et pensé pour être adapté au préprocesseur Sass. Nos fichiers de travail sont donc par défaut plutôt des `.scss` et non des `.css`.

Si, comme nous, vous intégrez à l'aide de préprocesseurs, KNACSS va vous faciliter la vie dès le début du projet puisqu'un [fichier de configuration](https://github.com/raphaelgoetter/KNACSS/blob/master/sass/_config-variables.scss) contenant toutes les variables du projet est intégré.
Libre à vous de le modifier selon les contraintes de votre projet.

**Attention**, si vous importez KNACSS automatiquement via Bower (par exemple dans un dossier `vendor`), ce fichier de configuration risque d'être écrasé à chaque mise à jour de KNACSS. **Nous vous invitons à en faire une copie dans votre dossier de travail et à commenter l'appel au fichier de config de `vendor`**.

Dans le cas d'un usage via préprocesseur, vos deux fichiers de travail principaux seront :
- le fichier `sass/_config-variables.scss` contenant toutes les variables du projet à définir une fois pour toute au départ
- le fichier `sass/knacss.scss` qui importe tous les fichiers que vous risquez d'employez dans votre projet.

En cours de développement, il vous suffit de compiler ce fichier `sass/knacss.scss` pour obtenir vos fichiers CSS utiles.

### Préfixes navigateurs

Certaines fonctionnalités avancées de KNACSS nécessitent d'employer toute une panoplie de préfixes CSS (`-webkit-`, `-moz-`, `-ms-`, ...) pour être certain que les propriétés CSS fonctionneront partout.

Au sein de la version classique CSS de KNACSS, l'ensemble des préfixes est présent, **vous n'avez donc pas à vous en soucier** (Autoprefixer réglé à "last 2 versions").

**Par contre, dans la version Sass de KNACSS, les préfixes n'apparaissent pas** pour ne pas polluer la lecture du fichier de travail. **Il vous sera donc nécessaire de les ajouter**, de préférence automatiquement grâce à un plugin ou aux excellents outils que sont [autoprefixer](https://github.com/postcss/autoprefixer) ou [pleeease](http://pleeease.io/).

### Mise à jour depuis une version précédente de KNACSS ?

La version `5.*.*` de KNACSS est une version majeure, ce qui implique que certaines fonctionnalités ne sont plus forcément rétro-compatibles avec les versions précédentes `4.*.*`.

Voici les principales modifications dont il faudra tenir compte lors d'une bascule vers la version 5 de KNACSS&nbsp;:

#### Modifications majeures depuis la `4.*.*`

- suppression de la version LESS (à partir de la version KNACSS 5.0, seul le préprocesseur Sass est encore pris en charge)
- suppression des fallbacks pour IE8-IE9 (à partir de la version KNACSS 5.0, seul IE10 et supérieurs sont pris en charge)
- restructuration / renommage des fichiers avec préfixes `_config-`, `_layout-`, `_library-`, `_object-`, `_override-`
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
