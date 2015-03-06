# KNACSS

http://www.knacss.com

KNACSS, c'est un peu comme une feuille de style CSS "reset" sur-vitaminée qui permet de commencer un projet à partir de zéro tout en tenant compte de bonnes pratiques générales (accessibilité, performance, responsive webdesign).

KNACSS prend en charge les styles de base, mais également la typographie, les modèles de boîte, les alignements et positionnements d'éléments, les grilles de mise en page, dans l'esprit d'être adapté à toutes les tailles d'écran (reponsive). Le tout automatiquement !

Conçu par l'agence web [Alsacreations.fr](http://alsacreations.fr) et pensé pour être employé avec des préprocesseurs tels que LESS ou Sass, le micro-framework KNACSS est employé quotidiennement sur toute sorte de projets web quel que soit son type ou son envergure.

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

### Vendor Prefixes

If you use one of the pre-processed version of KNACSS (LESS / Sass), beware that all the properties are declared **without vendor prefixes** (-webkit-,-moz-,-ms-,…), to gain clarity, and length of initial code.

You will certainly need to add these vendor prefixes yourself (this is usually done automatically today with Autoprefixer, [Mixture](http://mixture.io), [Prepros](http://alphapixels.com/prepros/), [Grunt](http://gruntjs.com), etc.).

## Liens utiles

* Website and download : http://knacss.com
* Documentation : http://knacss.com/doc.html
