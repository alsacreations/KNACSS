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
