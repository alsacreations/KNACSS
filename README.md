# KNACSS

http://www.knacss.com

KNACSS, c'est un peu comme une feuille de style CSS "reset" sur-vitaminée qui permet de commencer un projet à partir de zéro tout en tenant compte de bonnes pratiques générales (accessibilité, performance, responsive webdesign).

<hr>

**KNACSS 4 est sorti, voir toutes les modifications dans le [Changelog](https://github.com/raphaelgoetter/KNACSS/blob/master/changelog.md)**

<hr>

KNACSS prend en charge les styles de base, mais également la typographie, les modèles de boîte, les alignements et positionnements d'éléments, les grilles de mise en page, dans l'esprit d'être adapté à toutes les tailles d'écran (reponsive). Le tout automatiquement !

Conçu par l'agence web [Alsacreations.fr](http://alsacreations.fr) et pensé pour être couplé avec des préprocesseurs tels que LESS ou Sass, le micro-framework KNACSS est employé quotidiennement sur toute sorte de projets web quel que soit son type ou son envergure.

## Installation

La version courte est "il n'y a rien à installer".

Selon votre environnement de travail vous suffit de récupérer la feuille de styles :

- en version [CSS classique](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/css/knacss-unminified.css) (ou [minifié](vhttps://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/css/knacss.css))
- en version [LESS](https://github.com/raphaelgoetter/KNACSS/tree/master/less)
- en version [Sass](https://github.com/raphaelgoetter/KNACSS/tree/master/sass)

_Les versions LESS et Sass seront bien évidemment plus malléables grâce à l'apport de variables et fonctions._

## Usage

KNACSS n'est constitué que d'un seul fichier CSS (minifié ou non selon vos goûts), qu'il vous suffit d'ajouter à votre page HTML :

    <link rel="stylesheet" href="knacss.css">

Il est également possible de l'installer (toutes versions) via [Bower](http://bower.io/) : ```bower install knacss```

## RTFM!

KNACSS se veut être un outil simple (contrairement aux usines à gaz que sont Bootstrap ou Foundation), mais évolutif.
La contrepartie est que cela nécessite de votre part de bonnes connaissances en CSS et un petit effort de compréhension et de d'apprentissage des mécanismes de l'outil.

Une [**documentation**](https://github.com/raphaelgoetter/KNACSS/tree/master/doc) détaillée et illustrée est en cours de rédaction. Je vous invite vivement à la parcourir avant de vous jeter sur KNACSS.


## Préprocesseurs

KNACSS est conçu et pensé pour être adapté aux préprocesseurs que sont LESS et Sass. Nous employons LESS en interne, nos fichiers de travail sont donc des `.less` et non des `.css` (cela fonctionne aussi avec Sass).

Si, comme nous, vous intégrez à l'aide de préprocesseurs, KNACSS va vous faciliter la vie dès le début du projet puisqu'un [fichier de configuration](https://github.com/raphaelgoetter/KNACSS/blob/master/less/_00-config.less) contenant toutes les variables du projet est intégré.
Libre à vous de le modifier selon les contraintes de votre projet.

**Attention**, si vous importez KNACSS automatiquement via Bower par exemple (dans un dossier `vendor`), ce fichier de configuration risque d'être écrasé à chaque mise à jour de KNACSS. Nous vous invitons à en faire une copie dans votre dossier de travail et à commenter l'appel au fichier de config de `vendor`.

### Préfixes navigateurs

Certaines fonctionnalités avancées de KNACSS nécessitent d'employer toute une panoplie de préfixes CSS (`-webkit-`, `-moz-`, `-ms-`, ...) pour être certain que les propriétés CSS fonctionneront partout.

Au sein de la version classique CSS de KNACSS, l'ensemble des préfixes est présent, **vous n'avez donc pas à vous en soucier** (paramètres de Autoprefixer : "last 2 versions").

**Par contre, dans les versions LESS et Sass de KNACSS, les préfixes n'apparaissent pas** pour ne pas polluer la lecture du fichier de travail. **Il vous sera donc nécessaire de les ajouter**, de préférence automatiquement grâce à un plugin ou aux excellents outils que sont [autoprefixer](https://github.com/postcss/autoprefixer) ou [pleeease](http://pleeease.io/).

## Liens utiles

* Site web de KNACSS : http://knacss.com
* [**Documentation détaillée**](https://github.com/raphaelgoetter/KNACSS/tree/master/doc)
* Sur Alsacreations.com : ["découverte du framework KNACSS"](http://www.alsacreations.com/tuto/lire/1577-decouverte-du-framework-css-KNACSS.html)
* Générateur de gabarits HTML/CSS : ["Schnaps.it"](http://schnaps.it/)
