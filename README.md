# KNACSS

<https://www.knacss.com/>

KNACSS, c'est une sorte de feuille de style CSS "reset" sur-vitaminée qui permet de commencer un projet à partir de zéro tout en tenant compte de bonnes pratiques générales (accessibilité, performance, responsive webdesign, grille de mise en forme).

**Né en 2012 et après près de 10 années de bons et loyaux services, le projet initial « KNACSS » d'Alsacréations laisse place à une toute nouvelle version, totalement remaniée : KNACSS Reborn.**

## Documentation version actuelle (v8 = Reborn)

**Important : la version actuelle (v8.0.x) de KNACSS est encore en période de tests afin de s'adapter aux besoins de l'agence Alsacréations. Elle est partagée au public mais est susceptible d'évoluer à tout moment. Le niveau de version v8.1 marquera la première étape de sa stabilisation.**

- Site web de présentation de KNACSS Reborn : <https://www.knacss.com/>
- [**Documentation KNACSS Reborn**](https://www.knacss.com/doc.html)

## Documentation anciennes versions (v7)

- [**Documentation KNACSS v7**](https://www.knacss.com/doc-old.html)
- [**Pense-bête PDF KNACSS v7**](https://www.knacss.com/assets/pdf/knacss7-cheatsheet.pdf)

## Modulaire

Principe de briques modulaires :

- KNACSS Reborn est constitué uniquement des fichiers "Core".
- Les fichiers "Utils" seront des briques optionnelles (= les `@import` seront commentés par défaut).

```scss
// CORE
@import "abstracts/variables-sass";

@import "base/reset-base";
@import "base/reset-accessibility";
@import "base/reset-forms";
@import "base/reset-print";
@import "base/layout";

@import "abstracts/mixins-sass";

// UTILITY CLASSES
@import "utils/utils-global";
@import "utils/utils-spacers";
@import "utils/grillade";

// COMPONENTS (add them only if you need)
// @import "components/button";
// @import "components/burger";
// @import "components/checkbox";
// @import "components/radio";
// @import "components/quote";
```
