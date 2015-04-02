# Responsive Webdesign

## Points de rupture

Par défaut, KNACSS tient compte des valeurs de points de rupture suivants :

- "tiny" : correspond à une fenêtre de 480px ou moins
- "small" : correspond à une fenêtre entre 481px et 768px inclus
- "medium"correspond à une fenêtre entre 769px et 1024px inclus
- "large"correspond à une fenêtre entre 1025px et 1280px inclus
- "extra-large"correspond à une fenêtre entre 1281px et 1600px inclus
- "ultra-large"correspond à une fenêtre à partir de 1601px

_Les valeurs des points de rupture peuvent être modifiées au sein du fichier de configuration LESS / Sass._

## Préfixes de classe

Pour les points de rupture "large", "medium", "small" et "tiny", des préfixes de classes ont été introduits dans KNACSS :

- `.large-*` : préfixe KNACSS destiné aux styles sur écrans larges
- `.medium-*` : préfixe KNACSS destiné aux styles sur écrans medium
- `.small-*` : préfixe KNACSS destiné aux styles sur écrans small
- `.tiny-*` : préfixe KNACSS destiné aux styles sur écrans tiny

### Exemple : le point de rupture "tiny"

Voici quelques-unes des classes dédiées aux écrans de très petite taille&hellip; Le mot-clé `!important` est nécessaire pour être certain que les styles écrasent bien les styles appliqués par défaut.

Masquage / visibilité :

```css
.tiny-hidden {
    display: none !important;
}
.tiny-visible {
    display: block !important;
}
```

Modèles d'affichage :

```css
.tiny-no-float {
    float: none;
}
.tiny-inbl {
    display: inline-block;
    float: none;
    vertical-align: top;
}
.tiny-row {
    display: table !important;
    table-layout: fixed !important;
    width: 100% !important;
}
.tiny-col {
    display: table-cell !important;
    vertical-align: top !important;
}
```

Largeurs :

```css
.tiny-w25 {
    width: 25% !important;
}
.tiny-w33 {
    width: 33.3333% !important;
}
.tiny-w50 {
    width: 50% !important;
}
.tiny-w66 {
    width: 66.6666% !important;
}
.tiny-w75 {
    width: 75% !important;
}
.tiny-w100,
.tiny-wauto {
    display: block !important;
    float: none !important;
    clear: none !important;
    width: auto !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    border: 0;
}
```

Marges :

```css
.tiny-man,
    .tiny-ma0 {
        margin: 0 !important;
}
.tiny-pan,
.tiny-pa0 {
    padding: 0 !important;
}
```


## Règles de styles particulières

```css
@media (min-width: 1025px) {
  /* rules for big resources and big screens like: background-images, font-faces, etc. */
}
```

```css
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx) {
  /* style adjustments for high density devices */
}
```
