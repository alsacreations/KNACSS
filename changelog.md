# Changelog

## Changelog v8.0.0 (xxx 2019)

- mise à jour du reset, suppression des reset vendors (Reboot de Boostrap)
- support passé de IE10 à IE11 (browserlist)
- Browserslist devenu `.browserslistrc` et mise à jour du support à `>0.25%
not op_mini all`
- versions exactes des dépendances dans package.json (pour éviter "latest")
- renommage des classes `grid-` en `grillade-` pour éviter tout conflit 
- renommage de dossiers à la "7-1 pattern": `_config` > `abstracts`, `_library` > `base`, et du fichier `_base.scss` en `_reset.scss`
- fichier gulpfile.js dorénavant compatible Gulp 4
- modification de l'ordre d'import des fichiers : les utilitaires sont importées à la fin à présent
- ajout d'une variable pour supporter ou non IE11 : `$ie: true !default;`. 
- ajout d'une variable pour supporter ou non WordPress : `$wordpress: false !default;`. 
- `visually-hidden` devient un mixin
- corrections typo

## Changelog v7.1.2 (30 janvier 2019)

- ajout de la règle `@media (prefers-reduced-motion: reduce)`
- ajout de `@supports (display: grid)` dans le mixin de grille

## Changelog v7.1.1 (10 decembre 2018)

- patch correctif de gulpfile

## Changelog v7.1.0 (31 octobre 2018)

- mise à jour et meilleure intégration de gulp / postCSS :
  - autoprefixer version postCSS (avec browserslist officielle),
  - unprefix : pour supprimer les vieux préfixes inutiles
  - flexbox-fixes : pour corriger les erreurs connues sur IE
  - gap-properties : polyfill de gap -> grid-gap
  - minification CSS avec CSSnano
- application de `white-space: pre-rap` sur les textarea

## Changelog v7.0.9 (24 octobre 2018)

- correction d'alignement vertical de `.nav-button`

## Changelog v7.0.8 (20 septembre 2018)

- suppression de `white-space: nowrap` sur les éléments de formulaire

## Changelog v7.0.7 (3 juillet 2018)

- cohérence de renommage pour les classes utilitaires (ajout du préfixe `.u-` uniformément)

## Changelog v7.0.5 (25 mai 2018)

- mise à jour des styles, SVG, et variables des checkbox, radio et switches

## Changelog v7.0.4 (04 avril 2018)

- ajout de `::placeholder` cf. issue #276

## Changelog v7.0.3 (01 mars 2018)

- suppression de commentaires inutiles

## Changelog v7.0.2 (04 janvier 2018)

- intégration de (auto)grid dans Grillade

## Changelog v7.0.1 (22 décembre 2017)

- meilleure gestion des hyphens
- mise en commentaire du fix SVG our IE11

## Changelog v7.0.0 (août - novembre 2017)

- modifications, mises à jour :
  - architecture globale revisitée (vendor, config, library, components)
  - remplacement de normalize.css par Bootstrap reboot.css
  - déplacement des variables de gouttières de grillade.scss vers variables.scss
  - déplacement des variables de breakpoints de breakpoints.scss vers variables.scss
  - regroupement des styles des tableaux
  - renommage des variables couleur de projets
  - renommage des variables de composants
  - renommage des variables d'espacement (`$tiny-value` -> `$spacer-tiny`)
  - automatisation des classes utilitaires via Sass
  - suppression du namespace "kna-"
- refonte :
  - système de grille (dorénavant basé sur Grid Layout)
  - boutons, avec possibilités de variantes (primary, success, warning, etc.)
  - styles de formulaires
  - styles des tableaux
  - l'objet autogrid passe en Grid Layout
- ajouts :
  - des badges (tags), avec possibilités de variantes (primary, success, warning, etc.)
  - des alertes, avec possibilités de variantes (primary, success, warning, etc.)
  - d'un bouton de navigation `.nav-button`
  - des checkbox, radio et bouton "switch" stylés
  - des onglets (tabs)
  - des flèches courantes (haut, droit, bas, gauche) en SVG data-URI
  - création d'un mixin de grille
  - création d'un mixin de tailles de polices (responsive)
  - `* {min-width: 0}` pour éviter la valeur `auto` sur les flex-items et grid-items

## Changelog v6.1.2 (21 juin 2017)

- alignement des helpers flexbox sur ceux de Bootstrap (`.d-flex`, `.flex-row`, `.flex-column`, `.mr-auto`)
- alignement des breakpoints sur ceux de Bootstrap (576, 768, 992, 1200) et réorganisation des intervalles
- `tab-size: 2;` sur les `<pre>`
- passage en System Font Stack. cf. <https://css-tricks.com/snippets/css/system-font-stack/>

## Changelog v6.1.1 (21 avril 2017)

- amélioration du mixin "respond-to()"

## Changelog v6.1.0 (3 mars 2017)

- passage à [Normalize 5.0.0](https://github.com/necolas/normalize.css/blob/5.0.0/CHANGELOG.md)
- ajout de variables pour tailles de polices différentes sur petits et sur grands écrans (`$h1-size` et `$h1-size-l` par exemple). Par défaut, les tailles "mobile" sont appliquées, et les tailles "desktop" s'appliquent en min-width `$tiny +1`
- convention de nommage des variables pour faciliter les recherches : `$base-color` devient `$color-base`, `$link-color` devient `$link-color`, etc.
- typo fix

## Changelog v6.0.8 (10 janvier 2017)

- application de `$link-color-hover` uniquement si différent de `$link-color`

## Changelog v6.0.7 (7 décembre 2016)

- application de `$font-family-headings` uniquement si différent de `$font-stack-base`

## Changelog v6.0.6 (2 décembre 2016)

- Grillade : redéfinition du périmètre de `-small` : passe de `(min-width: ($tiny + 1)) and (max-width: $small)` à `(min-width: ($tiny + 1)) and (max-width: $medium)` (de 544px à 991px par défaut)

## Changelog v6.0.5 (1er décembre 2016)

- redéfinition des variables de breakpoints, à présent calées sur [celles de Bootstrap](https://v4-alpha.getbootstrap.com/layout/overview/#responsive-breakpoints)

## Changelog v6.0.4 (22 novembre 2016)

- renommage des variables

## Changelog v6.0.3 (10 novembre 2016)

- renommage `grid-item-*` en `item-*` pour éviter [les conflits](https://github.com/alsacreations/KNACSS/issues/222)

## Changelog v6.0.2 (27 octobre 2016)

- optimisation de la grille (de 8ko à 3ko pour la version Sass)

## Changelog v6.0.0 (26 septembre 2016)

- refonte intégrale de la grille de mise en forme (adoption de [grillade.css](http://grillade.knacss.com))
- suppression de include-media (cause de bugs d'encodage : cf. [#203](https://github.com/alsacreations/KNACSS/issues/203) / [#197](https://github.com/alsacreations/KNACSS/issues/197) , nécessite un temps d'apprentissage, et n'apporte pas grand chose au final).
- refonte des valeurs des Breakpoints et des classes responsive. [voir issue #210](https://github.com/alsacreations/KNACSS/issues/210)
- modularisation des fichiers et dossiers, classés par fonctions (config, vendor, library, objects, utility)
- ajout des objects courants : [media](http://codepen.io/raphaelgoetter/pen/KMWWwj) et [autogrid](http://codepen.io/raphaelgoetter/pen/KMgBJd?editors=1100)
- suppression des positionnements tabulaires. `.row`, `.col` et `.line` n'ont plus lieu d'être depuis Flexbox, pouvaient entrer en conflit avec d'autres frameworks et ne font que parasiter KNACSS
- amélioration du fichier Gulpfile.js
- corrections de bugs divers
- mise à jour de la doc

## Changelog v5.0.1 (24 mai 2016)

- les helpers de largeurs deviennent mobile-first et ne s'activent que sur écran d'une certaine taille. Ex. `.w700p {width: 700px;}` devient `@include media('>640px') {.w700p {width: 700px;}}`. Ainsi il n'est plus nécessaire de les écraser dans la feuille de style responsive.

## Changelog v5.0.0 (23 mai 2016)

- suppression du support IE8-IE9 (à partir de la version KNACSS 5.0, seul IE10 et supérieurs sont pris en charge)
- suppression du support LESS (à partir de la version KNACSS 5.0, seul le préprocesseur Sass est encore pris en charge pour des raisons de maintenabilité)
- mise à jour vers Normalize 4.1.1 : <https://github.com/necolas/normalize.css/blob/4.1.1/CHANGELOG.md>
- restructuration / renommage des fichiers avec préfixes `_config-`, `_layout-`, `_library-`, `_object-`, `_override-`
- ajout de la library include-media (<http://include-media.com/>) pour faciliter la gestion des media queries
- adaptation des variables de breakpoint pour les rendre compatibles avec include-media
- grille "grillade" à présent en mobile first (par défaut 1 colonne sur "tiny", 2 colonnes sur "small", valeurs modifiables)
- nommage de variables préfixé pour plus de maintenabilité : `$gutter` -> `$grid-gutter`, `$number` -> `$grid-number`, `$left` -> `$grid-left` et `$right` -> `$grid-right`
- renommage des éléments de grilles : `.flex-item-double` --> `.grid-item-double` (plus cohérent)
- ajout des éléments de layout : `.grid-item-first`, `.grid-item-medium` et `.grid-item-last`
- ajout de Table des Matières dans la feuille de style non minifiée
- adaptation des fichiers gulpfile, package.json et bower.json
- mise à jour de la documentation

## Changelog v4.4.5 (1er avril 2016)

- mise à jour vers Normalize 4 : <https://github.com/necolas/normalize.css/blob/4.0.0/CHANGELOG.md>
- application de min-width: 0 sur les flex-item-fluid pour éviter les minimum automatiques des flex-items
- suppression des styles spécifiques à Gmap (sélecteurs trop lourds pour un cas très particuliers)

## Changelog v4.4.4 (23 janvier 2016)

- mise à jour vers Normalize 3.0.3 : <https://github.com/necolas/normalize.css/>
- réalignement vertical des input et des label

## Changelog v4.4.3 (14 janvier 2016)

- ajout du patch `min-width: 0` sur les flex-items de grilles

## Changelog v4.4.2 (24 décembre 2015)

- correction d'un bug responsive des classes `.flex-item-double`
- création de la feuille de style dédiée aux grilles : *grillade.css* pour ceux qui souhaitent se contenter des grilles de KNACSS

## Changelog v4.4.0 (12 décembre 2015)

- ajout de classes d'état dans les helpers (`is-disabled`, `is-hidden`, `is-visually-hidden`, `is-unstyled`)
- import de la feuille de style dédiée WordPress mise en commentaire par défaut et activable au besoin
- la taille de police de base est à présent de "1.4rem" et non un calcul en `em` à partir d'une valeur en pixels
- suppression de `@font-stack-universal` devenue inutile (servait dans les grilles inline-block)
- suppression de "helvetica, arial" dans les font-stacks par défaut (seul reste "sans-serif")
- ajout d'une classe `.bfc` (actuellement alias de l'existante `.mod`)
- ajout d'une classe `.no-wrapping` pour les éléments qui ne doivent pas adopter de césures sur petit écran
- ajout de classes helpers pour les marges automatiques (`.mtauto`, `mrauto`, `.mauto`, etc.)

## Changelog v4.3.6 (10 novembre 2015)

- modification de la valeur par défaut de gouttière (`1em` -> `2rem`)
- correction d'un `padding: none` en `padding: 0` dans styling.less|sass

## Changelog v4.3.5 (20 octobre 2015)

- correction de doublons
- ajout de `word-break: break-all` sur les liens en responsive
- suppression du `outline: 0` sur les boutons au focus
- correction de visuels dans la documentation

## Changelog v4.3.4 (27 août 2015)

- ajout des classes `.pull` et `.push` pour les offsets des grilles
- corrections de la doc Print et Commencer
- corrections de nommages reliquats : `.flexitem-double` -> `.flex-item-double`
- suppression des styles graphiques pour tableaux alternate et striped
- modifications sur la classe `.visually-hidden`

## Changelog v4.3.3 (6 août 2015)

- ajout de helpers (breakpoints responsive)
- modification du seuil de breakpoint pour les grilles inégales `@tiny-screen` -> `@small-screen`
- corrections feuille de style print (modifications plus faciles pour l'utilisateur)

## Changelog v4.3.1 (5 juillet 2015)

- Amélioration des grilles responsive. Par exemple la classe `grid-4-small-2-tiny-1` définira une grille de 4 colonnes sur grand écran, puis en 2 colonnes sur un écran réduit, puis en une seule colonne sur petit écran. La notation `grid-4` fonctionne toujours, mais ne sera pas automatiquement responsive.

## Changelog v4.3.0 (3 juillet 2015)

- Les grilles de KNACSS sont à présent rétrocompatibles jusqu'à IE8 et Android2 grâce à un fallback en `display: inline-block` pour ces anciens navigateurs. Cependant les fonctionnalités resteront limitées chez ces dinosaures (pas de `flex-item-double`, de `flex-item-first`, etc.)

## Changelog v4.2.3 (2 juillet 2015)

- Passage à l'indentation via 2 espaces et non plus tabulations (+ `.editorconfig` à jour)
- Répartition des styles tabulaires entre les fichiers `tables` et `styling`
- pas de namespace sur les classes `.clear`, `.clearfix` et `.visually-hidden`
- ajout d'une classe `.bfc` (identique à `.mod`) et qui crée un contexte de formatage block

## Changelog v4.2.2 (26 juin 2015)

- Ajout de !default aux variables SASS dans le fichier `_00-config.scss`
- Flex-container enhancement
- select element enhancement on webkit
- correction largeurs des grilles pour IE
- correction de divers doublons

## Changelog v4.2.1 (25 mai 2015)

- pour les grilles, suppression de l'alignement justifié par défaut (justify-content: space-between)

## Changelog v4.2.0 (05 mai 2015)

- possibilité d'ajouter un namespace à l'ensemble des classes (configurable dans le fichier config de Less et Sass)

## Changelog v4.1.6 (17 avril 2015)

- mise en commentaire des sauts de page print avant un h1
- correction d'anomalie sur les input (user-select: none)
- correction d'erreur de compilation Sass

## Changelog v4.1.4 (14 avril 2015)

- ajout de node_modules dans le .gitignore
- ajout d'un gulpfile.js et des dépendances dans package.json
- ajout de la classe .unstyled destinée aux éléments de formulaires

## Changelog v4.1.3 (13 avril 2015)

Les classes relatives à flexbox ont été renommées pour ne pas entrer en conflit avec des outils tels que Modernizer (qui ajoutent aux-aussi ce genre de classes).

Anciens noms :

```
.flexbox, .flexbox-h
.flexbox-v
.flexitem-fluid
.flexitem-center
.flexitem-first, .flexitem-medium, .flexitem-last
```

Nouveaux noms :

```
.flex-container, .flex-container-h
.flex-container-v
.flex-item-fluid
.flex-item-center
.flex-item-first, .flex-item-medium, .flex-item-last
```

## Changelog v4.1.1 (30 mars 2015)

## Vite fait

- grosse remise à jour, orientée vers les technos modernes (flexbox, rem, calc,  ...) et moins de "bidouille"
- fin du support d'IE6-IE8 Si vous souhaitez utiliser KNACSS sur d'anciens navigateurs, préférez la [Version 3](https://github.com/raphaelgoetter/KNACSS/tree/3.1.0)
- ajout du reset [normalize.css](http://necolas.github.io/normalize.css/)
- un grand merci à @7studio pour ses conseils et observations sur la version beta de KNACSS 4.0
- attention : rétrocompatibilité non préservée pour certaines classes ( .left, .start, .txtleft, .fl, .table-, .flex-start, .flex-end)
- attention : rétrocompatibilité non préservée pour les grilles de mise en page (passage à flexbox et simplification de la structure)

## Done

- documentation en français
- PDF pense-bête mis à jour : <http://knacss.com/KNACSS-cheatsheet.pdf>
- gros ménage de printemps (gros nettoyage de tous les espaces et tabulations disgrâcieux)
- dans la section "quick print reset", ajout des classes .p-like, h1-like, h2-like etc.
- mise en commun globale de tous les styles p avec .p-like (h1 et h1-like, etc.).
- déplacement et commentaire sur la règle body > script
- correction du bug des height: auto sur les images au format SVG
- meilleure intégration de box-sizing
- suppression du fichier dédié aux réglages des bugs des anciennes versions d'IE6-IE8
- fin du support d'IE9 pour les grilles : KNACSS v4 compatible IE10+ pour ce qui concerne les mises en page en grilles (flexbox FTW!)
- réorganisation des fichiers (le fichier dédié "IE.css" disparait, le fichier "booleans" devient "misc" (plus cohérent), le fichier "gmaps" est désormais inclus dans "misc")
- ajout des préfixes ".table-" devant les styles de décoration des tableaux
- suppression du fichier icons.css, statistiquement inutile en pratique
- meilleure cohérence de nommage entre .left, .start, .txtleft, .fl
- ajout d'un fichier de reset dédié à WordPress
- refonte intégrale des grilles en Flexbox (et en plus ça marche sur IE10 !)
- ajout d'un fichier .editorconfig (<http://editorconfig.org/>)
- passage des :before/:after en ::before/::after
- ajout de sourcemaps CSS
- suppression des images noir et blanc forcées en media print
- correction de la formule LESS `{calc(1em * .625);`
- ajout du reset [normalize.css](http://necolas.github.io/normalize.css/)
- mise à jour du générateur de gabarits [Schnaps.it](http://schnaps.it/)
