# Grilles de mise en page
Il existe deux types principaux de systèmes de grilles dans KNACSS :

- Les grilles à colonnes égales
- Les grilles à colonnes inégales

Dans les deux cas, la technique associée depuis KNACSS v4 pour concevoir les grilles est **CSS3 Flexbox**, ce qui signifie que la compatibilité de **cette fonctionnalité sera réservée aux [navigateurs modernes](http://caniuse.com/#search=flexbox)** (IE10, Android 4.4+ et tous les autres).

**NOTE pour les utilisateurs de LESS / Sass :** par défaut, les grilles sont activées dans KNACSS. Si vous avez le moindre souci, vérifiez que `@import "_03-grids";` est présent et non commenté dans votre fichier `less/knacss.less` ou `sass/knacss.scss`). 

## Précautions à prendre

Qui dit CSS3 dit précautions à prendre.
La bonne nouvelle est que Flexbox est plutôt bien reconnu par l'ensemble des navigateurs de la planète; la mauvaise est que certains anciens navigateurs (Android par exemple) ne reconnaissent que certaines versions précédentes des spécifications. Il est donc encore nécessaire d'employer toute une panoplie de préfixes CSS (`-webkit-`, `-moz-`, `-ms-`, ...) pour être certain que vos grilles fonctionneront partout.

Au sein de la version CSS de KNACSS, l'ensemble des préfixes est présent, **vous n'avez donc pas à vous en soucier**.

**Par contre, dans les versions LESS et Sass de KNACSS, les préfixes n'apparaissent pas** pour ne pas polluer la lecture du fichier de travail. **Il vous sera donc nécessaire de les ajouter**, de préférence automatiquement grâce à un plugin ou aux excellents outils que sont [autoprefixer](https://github.com/postcss/autoprefixer) ou [pleeease](http://pleeease.io/).

## Exemple concret

Pour vous faire une idée, et jouer avec les valeurs possibles, vous trouverez [un exemple "bac à sable"](http://codepen.io/raphaelgoetter/pen/BybOag?editors=110) sur CodePen.

**Exemple de grille de colonnes égales :**
![grille de largeur égale](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/doc/illust/03-grid-even.png)

**Exemple de grille de colonnes inégales (3/4 - 1/4) :**
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

## Offsets 

Il vous est très facile de "pousser" un élément à droite ou à gauche de sa ligne dans la grille, et créer ainsi un espacement volontaire, ce que l'on appelle "offset".

Pour cela, appliquez simplement l'une ou l'autre de ces déclarations sur l'élément :

- `margin-left: auto` pour le pousser à droite sur sa ligne (ou avec la classe `.left`)
- `margin-right: auto` pour le pousser à gauche sur sa ligne (ou avec la classe `.right`)

![offset](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/doc/illust/03-offset.png)

## Mise en exergue

Il est possible de mettre un élément particulier en exergue, en **doublant sa taille** par rapport aux autres, tout en conservant un agencement parfait de la grille.

Pour ce faire, appliquez la classe `.flexitem-double` à cet élément.

![mise en exergue](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/doc/illust/03-double.PNG)

## Pousser au début ou à la fin

Vous pouvez modifier l'ordre d'affichage des éléments au sein d'une grille à l'aide des classes :

- `.flexitem-first` (l'élément apparaîtra avant tous les autres) 
- `.flexitem-last` (l'élément apparaîtra tout à la fin de la grille)

![preums!](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/doc/illust/03-first.PNG)

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

**Objectif : je souhaite que mon élément `.grid-container` crée une grille de 6 colonnes égales**

LESS (fichier de développement) :
```css
.grid-container { 
	.grid(6); 
}
```

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
