# Styles d'impression

KNACSS impose une mise en forme d'impression par défaut, à savoir :

- suppression des ombrages de boîte et de texte
- largeur automatique à la page (body)

```css
* {
  background: transparent !important;
  box-shadow: none !important;
  text-shadow: none !important;
}

body {
  width: auto;
  margin: auto;
  font-family: serif;
  font-size: 12pt;
}
```

KNACSS gère également les sauts de pages, les lignes veuves et orphelines :

```css
/* no orphans, no widows */
  p,
  .p-like,
  blockquote {
    orphans: 3;
    widows: 3;
  }
  /* no breaks inside these elements */
  blockquote,
  ul,
  ol {
    page-break-inside: avoid;
  }
  /* page break before main headers */
  h1,
  .h1-like {
    page-break-before: always;
  }
  /* no breaks after these elements */
  h1,
  .h1-like,
  h2,
  .h2-like,
  h3,
  .h3-like,
  caption {
    page-break-after: avoid;
  }
```

Une classe spécifique permet d'afficher ou de masquer du contenu sur imprimante :

```css
.print {
    display: block;
}
.no-print {
    display: none;
}
```

