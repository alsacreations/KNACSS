# Grilles de mise en page
Il existe deux types principaux de systèmes de grilles dans KNACSS :

- Les grilles à colonnes égales
- Les grilles à colonnes inégales

Dans les deux cas, la technique associée depuis KNACSS v4 pour concevoir les grilles est **CSS3 Flexbox**, ce qui signifie que la compatibilité de **cette fonctionnalité sera réservée aux [navigateurs modernes](http://caniuse.com/#search=flexbox)** (IE10, Android 4.4+ et tous les autres). Note : une alternative, basée sur `inline-block` est cependant proposée automatiquement pour les anciens navigateurs (IE8, Android 2).

Quelques exemples pour vous échauffer :
- `<div class="grid-4">` : grille de 4 colonnes également réparties
- `<div class="grid-2-1">` : grille de répartition 2/3 - 1/3
- `<div class="grid-3-tiny-1">` : grille de 3 colonnes égales, puis 1 colonne sur très petit écran
- `<div class="grid-6-small-3-tiny-2">` : grille de 6 colonnes, puis 3 colonnes sur écran "small", puis 2 colonnes sur écran "tiny".

Et maintenant passons aux explications&nbsp;!

**NOTE pour les utilisateurs de LESS / Sass :** par défaut, les grilles sont activées dans KNACSS. Si vous avez le moindre souci, vérifiez que `@import "_03-grids";` est présent et non commenté dans votre fichier `less/knacss.less` ou `sass/knacss.scss`).

## Précautions à prendre

Qui dit CSS3 dit précautions à prendre.
La bonne nouvelle est que Flexbox est plutôt bien reconnu par l'ensemble des navigateurs de la planète; la mauvaise est que certains anciens navigateurs (Android par exemple) ne reconnaissent que certaines versions précédentes des spécifications. Il est donc encore nécessaire d'employer toute une panoplie de préfixes CSS (`-webkit-`, `-moz-`, `-ms-`, ...) pour être certain que vos grilles fonctionneront partout.

Au sein de la version CSS de KNACSS, l'ensemble des préfixes est présent, **vous n'avez donc pas à vous en soucier**.

**Par contre, dans les versions LESS et Sass de KNACSS, les préfixes n'apparaissent pas** pour ne pas polluer la lecture du fichier de travail. **Il vous sera donc nécessaire de les ajouter**, de préférence automatiquement grâce à un plugin ou aux excellents outils que sont [autoprefixer](https://github.com/postcss/autoprefixer) ou [pleeease](http://pleeease.io/).

## Exemple concret

Pour vous faire une idée, et jouer avec les valeurs possibles, vous trouverez [un exemple "bac à sable"](http://codepen.io/raphaelgoetter/pen/BybOag?editors=110) sur CodePen.

**Exemple de grille de colonnes égales :**

HTML :
```html
<div class="grid-4"> <!-- parent div (ou autre) de 4 colonnes -->
    <div>un div ou n'importe quoi d'autre</div>
    <div>un 2è div ou n'importe quoi d'autre</div>
    <div>un 3è div ou n'importe quoi d'autre</div>
    <div>etc.</div>
</div>
```

Résultat :
![grille de largeur égale](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/doc/illust/03-grid-even.png)

**Exemple de grille de colonnes inégales (3/4 - 1/4) :**

HTML :
```html
<div class="grid-3-1"> <!-- parent div (ou autre) de 3-1 colonnes -->
    <div>un div ou n'importe quoi d'autre</div>
    <div>un 2è div ou n'importe quoi d'autre</div>
    <div>un 3è div ou n'importe quoi d'autre</div>
    <div>etc.</div>
</div>
```

Résultat :
![grille de largeur inégale](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/doc/illust/03-grid-uneven.png)

## Mise en oeuvre

Il est très simple de construire une grille, il vous suffit :

- D'un **conteneur**
- D'autant **d'enfants** que vous souhaitez

Le **conteneur** sera l'élément HTML que vous voulez (`div`, `section`, `ul`, ...). Il vous suffit simplement de le munir d'une classe selon votre choix de grille :

- `.grid-2`, `.grid-3`, `.grid-4`, ... `.grid-12` pour les grilles de largeur égale
- `.grid-2-1`, `.grid-1-2`, `.grid-3-1`, `.grid-1-3`, `.grid-3-2`, `.grid-2-3`, `.grid-4-1`, `.grid-1-4` pour les grilles de largeurs inégales (`.grid-2-1` vaut pour "2/3 - 1/3" par exemple).

Par défaut, chaque colonne est séparée de sa voisine par une gouttière dont la largeur par défaut est `1em`. Pour modifier ce réglage, il sera nécessaire de passer par la version préprocesseur (LESS, Sass) de KNACSS (voir plus loin).

Les **enfants** directs d'un conteneur, quels qu'ils soient, se répartissent automatiquement au sein de la grille formée par leur conteneur. Par exemple, 6 enfants contenus dans un parent de classe `.grid-3` se répartiront en 3 colonnes de 2 lignes.

- Tester une [grille simple en ligne](http://codepen.io/raphaelgoetter/pen/GAenb?editors=110) (Codepen).
- Tester une [grille de largeur inégale en ligne](http://codepen.io/raphaelgoetter/pen/jmAkx?editors=110) (Codepen).

## Offsets

Il vous est très facile de "pousser" un élément à droite ou à gauche de sa ligne dans la grille, et créer ainsi un espacement volontaire, ce que l'on appelle "offset".

Pour cela, appliquez simplement l'une ou l'autre de ces déclarations sur l'élément :

- la classe `.push` pour le pousser à droite sur sa ligne (applique un `margin-left: auto`)
- la classe `.pull` pour le pousser à gauche sur sa ligne (applique un `margin-right: auto`)

HTML :
```html
<div class="grid-4">
    <div>un div ou n'importe quoi d'autre</div>
    <div class="push">je suis poussé à droite</div>
    <div>un 3è div ou n'importe quoi d'autre</div>
    <div>etc.</div>
</div>
```

Résultat :
![offset](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/doc/illust/03-offset.png)

## Mise en exergue

Il est possible de mettre un élément particulier en exergue, en **doublant sa taille** par rapport aux autres, tout en conservant un agencement parfait de la grille.

Pour ce faire, appliquez la classe `.flex-item-double` à cet élément.

HTML :
```html
<div class="grid-4">
    <div>un div ou n'importe quoi d'autre</div>
    <div class="flex-item-double">je suis deux fois plus large que mes frères</div>
    <div>un 3è div ou n'importe quoi d'autre</div>
    <div>etc.</div>
</div>
```

Résultat :
![mise en exergue](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/doc/illust/03-double.PNG)

## Pousser au début ou à la fin

Vous pouvez modifier l'ordre d'affichage des éléments au sein d'une grille à l'aide des classes :

- `.flex-item-first` (l'élément apparaîtra avant tous les autres)
- `.flex-item-last` (l'élément apparaîtra tout à la fin de la grille)

HTML :
```html
<div class="grid-4">
    <div>un div ou n'importe quoi d'autre</div>
    <div class="flex-item-first">je m'affiche avant tous mes frères</div>
    <div>un 3è div ou n'importe quoi d'autre</div>
    <div>etc.</div>
</div>
```

Résultat :
![preums!](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/doc/illust/03-first.PNG)

## Grilles responsive

Vous pouvez définir le nombre de colonnes selon les tailles d'écran à l'aide des mots-clés suivants :

- `-small-*` : définit le nombre de colonnes lorsque le point de rupture atteint la valeur de la variable `small-screen`
- `-tiny-*` : définit le nombre de colonnes lorsque le point de rupture atteint la valeur de la variable `tiny-screen`

La grille ci-dessous s'affichera en 4 colonnes sur grand écran, puis en 2 colonnes sur un écran réduit, puis en une seule colonne sur petit écran :
```html
<div class="grid-4-small-2-tiny-1">
    <div>un div ou n'importe quoi d'autre</div>
    <div>un 2è div ou n'importe quoi d'autre</div>
    <div>un 3è div ou n'importe quoi d'autre</div>
    <div>etc.</div>
</div>
```

## Grilles imbriquées

Il est parfaitement possible d'imbriquer une grille dans une grille (mais n'en abusez pas !). Par exemple :

HTML :
```html
<div class="grid-2-1">
  <div>
    <ul class="unstyled grid-3">
    	<li>1</li>
    	<li>2</li>
    	<li>3</li>
    </ul>
  </div>
  <aside>
    2- lorem ipsum Hopla choucroute !
  </aside>
</div>
```

Résultat :
![imbriquée](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/doc/illust/imbriquee.png)

## Plus loin avec les préprocesseurs

KNACSS est pensé pour être utilisé à l'aide de preprocesseurs tels que LESS ou Sass. Il existe par conséquent un fichier de variables de configuration et des mixins prévus pour étendre les possibilités des grilles notamment.

### Modifier les variables globales

Les variables de configuration des grilles se trouvent dans le fichier `less/_00-config.less` (pour les utilisateurs de LESS) et `sass/_00-config.scss` (en version Sass) :

```css
@gutter: 1em;
@number: 4; // for equal columns
@left: 2; // left side of uneven columns
@right: 1; // right side of uneven columns
```

Il vous suffit de modifier les valeurs de ces variables de config pour répercuter vos préférences sur l'ensemble du projet dès que vos fichiers LESS/Sass seront compilés en CSS.

### Générer des grilles personnalisées

Indépendamment des variables de configuration, rien de vous empêche de créer une grille personnalisée en incluant directement l'un des deux mixins possibles dans vos éléments :

- `.grid(n)` pour personnaliser une grille de colonnes **égales**. Les arguments sont "n" = nombre de colonnes
- `.uneven-grid(l,r)` pour personnaliser une grille de colonnes **inégales**. Les arguments sont "l" = pour le ratio de la colonne de gauche,  "r" = pour le ratio de la colonne de droite

#### Grille de colonnes égales en LESS

**Objectif : je souhaite créer un mixin sur mon élément `.grid-container` afin que celui-ci crée une grille de 6 colonnes égales**

LESS (fichier de développement) :
```css
.grid-container {
	.grid(6);
}
```

**Important : il est nécessaire que le nom de votre classe globale contienne la chaîne `grid-` pour que le mixin fonctionne (ex. `grid-container`, `grid-box`, `grid-truc4`, etc.)**

CSS compilé (sans Autoprefixer) :

```css
.grid-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -1em;
}
.grid-container > * {
  flex: 0 0 auto;
  width: 16.66666667%;
  display: block;  /* IE fix */
  border-left: 1em solid transparent;
  background-clip: padding-box !important; /* no background on border */
}
...
```

#### Grille de colonnes inégales en LESS

**Objectif : je souhaite que mon élément `.grid-truc` crée une grille de 2 colonnes réparties en 2/3 et 1/3.**

LESS (fichier de développement) :

```css
.grid-truc {
	.uneven-grid(2, 1);
}
```

**Important : il est nécessaire que le nom de votre classe globale contienne la chaîne `grid-` pour que le mixin fonctionne (ex. `grid-container`, `grid-box`, `grid-truc4`, etc.)**


CSS compilé (sans Autoprefixer) :

```css
.grid-truc {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -1em;
}
.grid-truc > * {
  display: block; /* IE fix */
  border-left: 1em solid transparent;
  background-clip: padding-box !important; /* no background on border */
}
.grid-truc > *:nth-child(odd) {
  width: 66.66666667%;
}
.grid-truc > *:nth-child(even) {
  width: 33.33333333%;
}
...
```

## Article associé

Si vous voulez comprendre dans le détail le fonctionnement des grilles Flexbox de KNACSS, je vous invite à suivre l'article d'Alsacréations ["Une grille responsive avec CSS3 Flexbox et LESS (ou Sass)"](http://www.alsacreations.com/tuto/lire/1659-une-grille-responsive-avec-flexbox-et-LESS.html).
