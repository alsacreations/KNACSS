# changelog v4.4.2 (24 décembre 2015)

- correction d'un bug responsive des classes `.flex-item-double`
- création de la feuille de style dédiée aux grilles : *grillade.css* pour ceux qui souhaitent se contenter des grilles de KNACSS

# changelog v4.4.0 (12 décembre 2015)

- ajout de classes d'état dans les helpers (`is-disabled`, `is-hidden`, `is-visually-hidden`, `is-unstyled`)
- import de la feuille de style dédiée WordPress mise en commentaire par défaut et activable au besoin
- la taille de police de base est à présent de "1.4rem" et non un calcul en `em` à partir d'une valeur en pixels
- suppression de `@font-stack-universal` devenue inutile (servait dans les grilles inline-block)
- suppression de "helvetica, arial" dans les font-stacks par défaut (seul reste "sans-serif")
- ajout d'une classe `.bfc` (actuellement alias de l'existante `.mod`)
- ajout d'une classe `.no-wrapping` pour les éléments qui ne doivent pas adopter de césures sur petit écran
- ajout de classes helpers pour les marges automatiques (`.mtauto`, `mrauto`, `.mauto`, etc.)


# changelog v4.3.6 (10 novembre 2015)

- modification de la valeur par défaut de gouttière (`1em` -> `2rem`)
- correction d'un `padding: none` en `padding: 0` dans styling.less|sass

# changelog v4.3.5 (20 octobre 2015)

- correction de doublons
- ajout de `word-break: break-all` sur les liens en responsive
- suppression du `outline: 0` sur les boutons au focus
- correction de visuels dans la documentation

# changelog v4.3.4 (27 août 2015)

- ajout des classes `.pull` et `.push` pour les offsets des grilles
- corrections de la doc Print et Commencer
- corrections de nommages reliquats : `.flexitem-double` -> `.flex-item-double`
- suppression des styles graphiques pour tableaux alternate et striped
- modifications sur la classe `.visually-hidden`

# changelog v4.3.3 (6 août 2015)

- ajout de helpers (breakpoints responsive)
- modification du seuil de breakpoint pour les grilles inégales `@tiny-screen` -> `@small-screen`
- corrections feuille de style print (modifications plus faciles pour l'utilisateur)

# changelog v4.3.1 (5 juillet 2015)

- Amélioration des grilles responsive. Par exemple la classe `grid-4-small-2-tiny-1` définira une grille de 4 colonnes sur grand écran, puis en 2 colonnes sur un écran réduit, puis en une seule colonne sur petit écran. La notation `grid-4` fonctionne toujours, mais ne sera pas automatiquement responsive.

# changelog v4.3.0 (3 juillet 2015)

- Les grilles de KNACSS sont à présent rétrocompatibles jusqu'à IE8 et Android2 grâce à un fallback en `display: inline-block` pour ces anciens navigateurs. Cependant les fonctionnalités resteront limitées chez ces dinosaures (pas de `flex-item-double`, de `flex-item-first`, etc.)

# changelog v4.2.3 (2 juillet 2015)

- Passage à l'indentation via 2 espaces et non plus tabulations (+ `.editorconfig` à jour)
- Répartition des styles tabulaires entre les fichiers `tables` et `styling`
- pas de namespace sur les classes `.clear`, `.clearfix` et `.visually-hidden`
- ajout d'une classe `.bfc` (identique à `.mod`) et qui crée un contexte de formatage block

# changelog v4.2.2 (26 juin 2015)

- Ajout de !default aux variables SASS dans le fichier `_00-config.scss`
- Flex-container enhancement
- select element enhancement on webkit
- correction largeurs des grilles pour IE
- correction de divers doublons

# changelog v4.2.1 (25 mai 2015)

- pour les grilles, suppression de l'alignement justifié par défaut (justify-content: space-between)

# changelog v4.2.0 (05 mai 2015)

- possibilité d'ajouter un namespace à l'ensemble des classes (configurable dans le fichier config de Less et Sass)

# changelog v4.1.6 (17 avril 2015)

- mise en commentaire des sauts de page print avant un h1
- correction d'anomalie sur les input (user-select: none)
- correction d'erreur de compilation Sass

# changelog v4.1.4 (14 avril 2015)

- ajout de node_modules dans le .gitignore
- ajout d'un gulpfile.js et des dépendances dans package.json
- ajout de la classe .unstyled destinée aux éléments de formulaires

# changelog v4.1.3 (13 avril 2015)

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

# changelog v4.1.1 (30 mars 2015)

## Vite fait

* grosse remise à jour, orientée vers les technos modernes (flexbox, rem, calc,  ...) et moins de "bidouille"
* fin du support d'IE6-IE8 Si vous souhaitez utiliser KNACSS sur d'anciens navigateurs, préférez la [Version 3](https://github.com/raphaelgoetter/KNACSS/tree/3.1.0)
* ajout du reset [normalize.css](http://necolas.github.io/normalize.css/)
* un grand merci à @7studio pour ses conseils et observations sur la version beta de KNACSS 4.0
* attention : rétrocompatibilité non préservée pour certaines classes ( .left, .start, .txtleft, .fl, .table-, .flex-start, .flex-end)
* attention : rétrocompatibilité non préservée pour les grilles de mise en page (passage à flexbox et simplification de la structure)

## done

* documentation en français
* PDF pense-bête mis à jour : http://knacss.com/KNACSS-cheatsheet.pdf
* gros ménage de printemps (gros nettoyage de tous les espaces et tabulations disgrâcieux)
* dans la section "quick print reset", ajout des classes .p-like, h1-like, h2-like etc.
* mise en commun globale de tous les styles p avec .p-like (h1 et h1-like, etc.).
* déplacement et commentaire sur la règle body > script
* correction du bug des height: auto sur les images au format SVG
* meilleure intégration de box-sizing
* suppression du fichier dédié aux réglages des bugs des anciennes versions d'IE6-IE8
* fin du support d'IE9 pour les grilles : KNACSS v4 compatible IE10+ pour ce qui concerne les mises en page en grilles (flexbox FTW!)
* réorganisation des fichiers (le fichier dédié "IE.css" disparait, le fichier "booleans" devient "misc" (plus cohérent), le fichier "gmaps" est désormais inclus dans "misc")
* ajout des préfixes ".table-" devant les styles de décoration des tableaux
* suppression du fichier icons.css, statistiquement inutile en pratique
* meilleure cohérence de nommage entre .left, .start, .txtleft, .fl
* ajout d'un fichier de reset dédié à WordPress
* refonte intégrale des grilles en Flexbox (et en plus ça marche sur IE10 !)
* ajout d'un fichier .editorconfig (http://editorconfig.org/)
* passage des :before/:after en ::before/::after
* ajout de sourcemaps CSS
* suppression des images noir et blanc forcées en media print
* correction de la formule LESS `{calc(1em * .625);`
* ajout du reset [normalize.css](http://necolas.github.io/normalize.css/)
* mise à jour du générateur de gabarits [Schnaps.it](http://schnaps.it/)
