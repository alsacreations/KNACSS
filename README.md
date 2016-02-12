# KNACSS

http://www.knacss.com

KNACSS, c'est un peu comme une feuille de style CSS "reset" sur-vitaminée qui permet de commencer un projet à partir de zéro tout en tenant compte de bonnes pratiques générales (accessibilité, performance, responsive webdesign).

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

À noter que KNACSS est basé sur un socle [Normalize.css](http://necolas.github.io/normalize.css/), célèbre - et éprouvé - reset CSS employé par Twitter, Github, Bootstrap, Guardian, etc.

## Usage

KNACSS n'est constitué que d'un seul fichier CSS (minifié ou non selon vos goûts), qu'il vous suffit d'ajouter à votre page HTML :

    <link rel="stylesheet" href="knacss.css">

Il est également possible de l'installer (toutes versions) via [Bower](http://bower.io/) : ```bower install knacss```

## Compatibilité

KNACSS est - dans sa grande majorité - compatible avec l'ensemble des navigateurs à partir d'IE8 inclus.

Seules exceptions :

- les positionnements avancés à base de Flexbox (IE10+ minimum), c'est à dire toutes les classes débutant par `.flex-`
- les grilles de mise en page, également basées sur flexbox  (IE10, Android 4.4+), c'est à dire toutes les classes débutant par `.grid-`. Note : une alternative, basée sur `inline-block` est cependant proposée automatiquement pour les anciens navigateurs (IE8, Android 2).

## Juste une grille ? Grillade !

KNACSS en version complète ne vous convient pas&nbsp;? Seule la grille flexbox vous intéresse&nbsp;? Bienvenue dans *Grillade* !

### votre grillade avec LESS ?

Il est possible de n'utiliser KNACSS que pour sa fonctionnalité de grille de positionnement et de bénéficier de colonnes égales, inégales, responsive, des offsets, des pull et push et des mises en exergue. Bref, de [tout l'attirail des grilles KNACSS](https://github.com/alsacreations/KNACSS/blob/master/doc/03-grilles.md).

Il vous suffit pour cela de récupérer le fichier suivant : [grillade.less](https://raw.githubusercontent.com/alsacreations/KNACSS/master/css/grillade.less)

Ce fichier n'est rien d'autre que la concaténation de deux fichiers essentiels :
- `_00-config.less` (nécessaire pour les variables, les tailles de gouttières et les valeurs de breakpoints)
- `_03-grids.less` (ben oui, quand même)

### votre grillade plutôt nature ?

Vous souhaitez simplement bénéficier d'une grille de mise en page simple mais fonctionnelle, en pur CSS sans passer par LESS ou Sass&nbsp;?

Alors contentez-vous du fichier <a href="https://raw.githubusercontent.com/alsacreations/KNACSS/master/css/grillade.css"><strong>grillade.css</strong></a>, il est parfaitement autonome et ne pèse que 4ko seulement&nbsp;!

Par contre, n'oubliez quand même pas de lire [la documentation](https://github.com/alsacreations/KNACSS/blob/master/doc/03-grilles.md) que l'on a concoctée rien que pour vous.

## Documentation de KNACSS

KNACSS se veut être un outil simple (contrairement aux usines à gaz que sont Bootstrap ou Foundation), mais évolutif.
La contrepartie est que cela nécessite de votre part de bonnes connaissances en CSS et un petit effort de compréhension et de d'apprentissage des mécanismes de l'outil.

Je vous invite vivement à parcourir la [**documentation**](https://github.com/raphaelgoetter/KNACSS/tree/master/doc) avant de vous jeter sur KNACSS.

Sachez qu'un [pense-bête en PDF](http://knacss.com/KNACSS-cheatsheet.pdf) est également disponible pour vous rappeler des classes utiles de KNACSS.

<p>Vous y trouverez en détail, avec codes et illustrations, les différentes sections suivantes&nbsp;:</p>
<ol>
<li><a href="https://github.com/raphaelgoetter/KNACSS/blob/master/doc/00-commencer.md">Comment débuter avec KNACSS</a></li>
<li><a href="https://github.com/raphaelgoetter/KNACSS/blob/master/doc/01-typo-et-reset.md">Typographie et reset</a></li>
<li><a href="https://github.com/raphaelgoetter/KNACSS/blob/master/doc/02a-layout-alignements.md">Gérer les alignements de base</a></li>
<li><a href="https://github.com/raphaelgoetter/KNACSS/blob/master/doc/02b-layout-positionnement.md">Gérer le positionnement des éléments</a></li>
<li><a href="https://github.com/raphaelgoetter/KNACSS/blob/master/doc/03-grilles.md">Construire des grilles de mise en page</a></li>
<li><a href="https://github.com/raphaelgoetter/KNACSS/blob/master/doc/04-tableaux.md">Styler les tableaux</a></li>
<li><a href="https://github.com/raphaelgoetter/KNACSS/blob/master/doc/05-formulaires.md">Styler les formulaires</a></li>
<li><a href="https://github.com/raphaelgoetter/KNACSS/blob/master/doc/06-helpers.md">Classes "visuelles"</a> (marges et largeurs)</li>
<li><a href="https://github.com/raphaelgoetter/KNACSS/blob/master/doc/07-responsive.md">Responsive Webdesign</a></li>
<li><a href="https://github.com/raphaelgoetter/KNACSS/blob/master/doc/08-print.md">Styles pour l'impression</a></li>
<li><a href="https://github.com/raphaelgoetter/KNACSS/blob/master/doc/09-misc.md">Styles divers (césures, Google Maps, liens d'évitement)</a></li>
<li><a href="https://github.com/raphaelgoetter/KNACSS/blob/master/doc/11-wordpress.md">Adaptations pour WordPress</a></li>
</ol>


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
