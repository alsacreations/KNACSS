# Grilles de mise en page

"Grillade" est un système de grille simple et élaboré avec CSS3 Flexbox. Il est intégré par défaut dans le micro-framework KNACSS d'Alsacréations mais peut être utilisé de manière autonome sans nécessiter KNACSS ou d'autre dépendance.

Grillade a les caractéristiques globales suivantes :

- Double système de grille :
  - Mono-ligne : possibilité par défaut d'émuler [l'objet "autogrid"](http://codepen.io/raphaelgoetter/pen/KMgBJd?editors=1100) : `.grid` affiche sur une ligne autant d'enfants que nécessaires (et de taille identique)
  - Multi-ligne : possibilité de passer en multi-lignes dès que l'on ajoute un suffixe numéroté (ex. `.grid-2`, `.grid-3` ... `.grid-12`)
- "Mobile-first" : par défaut une grille sera disposée sur une colonne, et ne s'active que lorsque l'écran dépasse le breakpoint `$tiny`
- Largeurs de colonnes fluides et égales par défaut, mais possibilité de définir individuellement la taille de chaque enfant si besoin (ex. `.one-half`, `.one-third`, `.one-quarter`, `.two-thirds`, etc.)
- Possibilité d'inverser toute la grille grâce au suffixe `--reverse`
- Possibilité de préciser le nombre de colonnes en taille d'écran "small" à l'aide du suffixe `-small-X` (X colonnes)
- Possibilité d'appliquer une gouttière entre les éléments
- Possibilité d'offsets (pull / push)
- Possibilité de réordonner les éléments (au début / à la fin)
- Possibilité de réaliser ses propres grilles multi-colonnes via un mixin Sass. ex. `.o-grid-perso { @include grid(4, 3rem); }`

Spécificités techniques :

- Grillade est basé sur CSS3 Flexbox, ce qui le rend incompatible avec les anciennes versions d'Internet Explorer (IE9 inclus) ainsi que certains anciens navigateurs (Android &lt;4.4 par exemple)
- Les préfixes CSS3 (`-webkit-`, `-moz-`, `-ms-`, …) sont pris en charge au sein de la version CSS de Grillade, mais pas dans sa version Sass. Il vous sera donc nécessaire de les ajouter, de préférence automatiquement grâce à l'excellent outil autoprefixer.
- Les valeurs par défaut des points de rupture responsive (Breakpoints) de Grillade sont : `$tiny = 544px` et `$small = 768px`, vous pouvez modifier ou ajouter des valeurs dans la version Sass.

**documentation complète, illustrée et détaillée sur le site http://grillade.knacss.com**
