# Responsive Webdesign

## Points de rupture

Par défaut, KNACSS tient compte des valeurs de points de rupture suivants :

```
// breakpoints (choose unit you prefer)
@tiny-screen            : 320px; // tiny screens media query (less-equal than 320px)
@tiny-plus-screen       : 480px; // screens between 321px and 480px
@small-screen           : 640px; // screens between 481px and 640px
@small-plus-screen      : 768px; // screens between 641px and 768px
@medium-screen          : 960px; // screens between 769px and 960px
@medium-plus-screen     : 1024px; // screens between 961px and 1024px
@large-screen           : 1280px; // screens between 1025px and 1280px
@large-plus-screen      : 1440px; // screens between 1281px and 1440px
@extra-large-screen     : 1600px; // screens between 1441px and 1600px
@ultra-large-screen     : 1920px; // ultra large screens
```


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
