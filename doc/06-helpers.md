# Helpers

Les "Helpers" sont des classes purement visuelles et utilitaires (non "sémantiques"), pas très jolie mais rudement pratiques en production pour alléger vos feuilles de styles.

**Attention toutefois !** Ce type de classes conduit fréquemment [à des abus au sein de votre code HTML](http://blog.goetter.fr/2014/11/10/bien-utiliser-un-framework-css/).

Par exemple, Si vous avez 20 images au comportement identique dans la page, ne les affublez pas de classes visuelles multiples telles que `img class="mod clearfix left inbl w200p pas mb1 large-mb2 small-mbn"` mais optez plutôt pour une classe personnalisée : `img class="media"` par exemple.

**Méthode :** Limitez-vous à 4 noms de classes au grand maximum par élément HTML. Si vous pensez qu’il vous en faut davantage, il est temps d’envisager une classe personnalisée, ou de profiter des pré-processeurs CSS.

_Les valeurs de helpers peuvent être modifiées au sein du fichier de configuration LESS / Sass._

## les Helpers de largeur

Largeurs fluides (en pourcentage) :

```css
.w10 {
  width: 10%;
}
.w20 {
  width: 20%;
}
.w25 {
  width: 25%;
}
...
.w100 {
  width: 100%;
}

```

Largeurs fixes (en pixel) :

```css
.w50p {
  width: 50px;
}
.w100p {
  width: 100px;
}
.w150p {
  width: 150px;
}
...
.w960p {
  width: 960px;
}
.w1140p {
  width: 1140px;
}

```

Largeurs spéciales :

```css
.mw960p {
  max-width: 960px;
}
.mw1140p {
  max-width: 1140px;
}
.wauto {
  width: auto;
}
```


## les Helpers d'espacement

Les herpers d'espacement comportent des classes dédiées aux marges externes (margin) et aux marges internes (padding).

Leur nommage est assez intuitif :

- p,m = padding, margin
- a,t,r,b,l = all, top, right, bottom,left
- s,m,l,n (ou 0) = small, medium, large, none (ou 0)

Exemples :

- `.prs` signifie "padding-right small" (où "small" est défini dans votre fichier de configuration, par défaut 5px)
- `.man` signifie "margin all none" (fonctionne aussi avec la syntaxe `.ma0`)

### les marges externes (margin)

```css
.man,
.ma0 {
  margin: 0;
}
.mas {
  margin: 10px;
}
.mam {
  margin: 20px;
}
.mal {
  margin: 40px;
}
.mtn,
.mt0 {
  margin-top: 0;
}
.mts {
  margin-top: 10px;
}
.mtm {
  margin-top: 20px;
}
.mtl {
  margin-top: 40px;
}
...
```

### les marges internes (padding)

```css
.ptn,
.pt0 {
  padding-top: 0;
}
.pts {
  padding-top: 10px;
}
.ptm {
  padding-top: 20px;
}
.ptl {
  padding-top: 40px;
}
.prn,
.pr0 {
  padding-right: 0;
}
.prs {
  padding-right: 10px;
}
.prm {
  padding-right: 20px;
}
.prl {
  padding-right: 40px;
}
...
```
