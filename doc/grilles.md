# les grilles de mise en page
Il existe deux types principaux de systèmes de grilles dans KNACSS :

- Les grilles à colonnes égales
- Les grilles à colonnes inégales

Dans les deux cas, la technique associée depuis KNACSS v4 pour concevoir les grilles est **CSS3 Flexbox**, ce qui signifie que la compatibilité de **cette fonctionnalité sera réservée aux [navigateurs modernes](http://caniuse.com/#search=flexbox)** (IE10 et tous les autres, soit environ 95% du marché en France en 2015).

## Précautions

préfixes (autoprefixer, pleeease)

## Mise en oeuvre

Il est très simple de construire une grille, il vous suffit :

- D'un **conteneur**
- D'autant **d'enfants** que vous souhaitez

Le **conteneur** sera l'élément HTML que vous voulez (`div`, `section`, `ul`, ...). Il vous suffit simplement de le munir d'une classe selon votre choix de grille :

- `.grid-2`, `.grid-3`, `.grid-4`, ... `.grid-12` pour les grilles de largeur égales
- `.grid-2-1`, `.grid-1-2`, `.grid-3-1`, ... `.grid-1-4` pour les grilles de largeur inégales (2/3 - 1/3 par exemple)

Par défaut, chaque colonne est séparée de sa voisine par une gouttière dont la largeur par défaut est `1em`. Pour modifier ce réglage, il sera nécessaire de passer par la version préprocesseur (LESS, Sass) de KNACSS (voir plus loin).

Les **enfants** directs d'un conteneur, quels qu'ils soient, se répartissent automatiquement au sein de la grille formée par leur conteneur. Par exemple, 6 enfants contenus dans un parent de classe `.grid-3` se répartiront en 3 colonnes et 2 lignes.

## Offsets 

margin-left ou margin-right

## À la une

".flexitem-double"

## Pousser au début ou à la fin

".flexitem-first" and ".flexitem-last"

## Pour aller plus loin

Si vous voulez comprendre dans le détail le fonctionnement des grilles Flexbox de KNACSS, je vous invite à suivre l'article d'Alsacréations ["Une grille responsive avec CSS3 Flexbox et LESS (ou Sass)"](http://www.alsacreations.com/tuto/lire/1659-une-grille-responsive-avec-flexbox-et-LESS.html).