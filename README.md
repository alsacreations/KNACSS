# KNACSS

http://www.knacss.com

KNACSS, c'est un peu comme une feuille de style CSS "reset" sur-vitaminée qui permet de commencer un projet à partir de zéro tout en tenant compte de bonnes pratiques générales (accessibilité, performance, responsive webdesign).

KNACSS prend en charge les styles de base, mais également la typographie, les modèles de boîte, les alignements et positionnements d'éléments, les grilles de mise en page, dans l'esprit d'être adapté à toutes les tailles d'écran (reponsive). Le tout automatiquement !

  is a minimalist, responsive and extensible style sheet to kick-start your HTML / CSS projects. 

Conçu par l'agence web [Alsacreations.fr](http://alsacreations.fr) et pensé pour être employé avec des préprocesseurs tels que LESS ou Sass, le micro-framework KNACSS est employé quotidiennement sur toute sorte de projets web quel que soit son type ou son envergure.

## Installation

La version courte est "il n'y a rien à installer".
KNACSS n'est constitué que d'un seul fichier CSS (minifié ou non selon vos goûts), qu'il vous suffit d'ajouter à votre page HTML :

    <link rel="stylesheet" href="knacss.css">

You can also install KNACSS with [Bower](http://bower.io/) : ```bower install knacss```

&hellip; Or you can also choose the KNACSS Builder : http://knacss.com/builder/


## Usage

KNACSS is a collection of ready to use styles and snippets to kick-start your project. Feel free to use it as a “reset”, then make it grow to suit your needs.
Take the time to read the documentation before jumping in. Indeed, KNACSS doesn’t always suit beginners’ needs since a little thing can have big consequences.

## Préprocesseurs

### Vendor Prefixes 

If you use one of the pre-processed version of KNACSS (LESS / Sass), beware that all the properties are declared **without vendor prefixes** (-webkit-,-moz-,-ms-,…), to gain clarity, and length of initial code.

You will certainly need to add these vendor prefixes yourself (this is usually done automatically today with Autoprefixer, [Mixture](http://mixture.io), [Prepros](http://alphapixels.com/prepros/), [Grunt](http://gruntjs.com), etc.).

## Liens utiles

* Website and download : http://knacss.com
* Documentation : http://knacss.com/doc.html
