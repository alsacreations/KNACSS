# Responsive Webdesign

## Points de rupture

Par défaut, KNACSS tient compte des valeurs de points de rupture suivants :

```
// breakpoints (choose unit you prefer)
$tiny: 543px !default; // or 'em' if you prefer, of course
$small: 767px !default;
$medium: 991px !default;
$large: 1199px !default;
$extra-large: 1439px !default;
```

_Les valeurs des points de rupture peuvent être modifiées au sein du fichier de configuration LESS / Sass._

## Convention d'écriture

### Choix des valeurs de breakpoints

1. Choisir principalement des valeurs de breakpoints selon votre design, pas par rapport à des devices (se servir des variables de breakpoints fournies si l'on ne peut pas se baser sur son design)
2. En plus de vos propres valeurs, il est possible d'employer :
  - les variables fournies (`$tiny`, `$small`, `$medium`, `$large`),
  - mais aussi des alias qui représentent des intervalles et que l'on utilise sous forme de mixins (voi plus bas)
3. Éviter de multiplier les valeurs. Un maximum de 5 ou 6 breakpoints devrait suffire dans la grande majorité des projets
4. **Pour éviter les intervalles qui se chevauchent, ou des Media Queries trop variés, adopter la convention suivante pour définir les intervalles :
`(max-width: $BP) and (min-width: ($BP + 1))`**

Exemple :

Non, pas bien :
```
@media (min-width: 767px) {...}
@media (max-width: 768px) {...}
```

Oui, bien :
```
@media (min-width: 768px) {...}
@media (max-width: 767px) {...}
@media (max-width: $small-screen) {...}
@media (min-width: $small-screen + 1) and (max-width: $large-screen) {...}
```

## Mixins "Alias"

En addition aux variables, des mixins de breakpoints "utilitaires" (des "alias" des valeurs précédentes) liées aux tailles de devices (forcément indicatifs, mais simples à retenir) sont prévues.

Les mixins sont activés à l'aide de l'instruction `respond-to()`. Exemple d'usage :

```
// styles
.when-tablet-up {
  @include respond-to("small-up") {
    background: green;
    color: #fff;
  }
}
.is-hidden-mobile {
  @include respond-to("tiny") {
    display: none;
  }
}
```

```
// Additionnal "utility" breakpoints aliases
// ex. @include respond-to("medium-up") {...}
@function breakpoint($bp) {
  @if $bp == 'tiny' {
    @return '(max-width: #{$tiny})';
  }
  @else if $bp == 'small' {
    @return '(max-width: #{$small})';
  }
  @else if $bp == 'medium' {
    @return '(max-width: #{$medium})';
  }
  @else if $bp == 'large' {
    @return '(max-width: #{$large})';
  }
  @else if $bp == 'extra-large' {
    @return '(max-width: #{$extra-large})';
  }
  @else if $bp == 'tiny-up' {
    @return '(min-width: #{$tiny + 1})';
  }
  @else if $bp == 'small-up' {
    @return '(min-width: #{$small + 1})';
  }
  @else if $bp == 'medium-up' {
    @return '(min-width: #{$medium + 1})';
  }
  @else if $bp == 'large-up' {
    @return '(min-width: #{$large + 1})';
  }
  @else if $bp == 'extra-large-up' {
    @return '(min-width: #{$extra-large + 1})';
  }
  @else if $bp == 'retina' {
    @return '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx)';
  }
}

@mixin respond-to($value) {
  $string: breakpoint($value);
  @media screen and #{$string} {
    @content;
  }
}
```




Voir le CodePen : http://codepen.io/raphaelgoetter/pen/EyRwAp/?editors=1100


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
