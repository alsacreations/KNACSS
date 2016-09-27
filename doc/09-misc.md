# Divers

La feuille de style "fourre-tout" de KNACSS, où l'on retrouve des règles pratiques dans certains contextes, mais pas suffisamment universelles pour être appliquées par défaut dans un framework.

## Liens d'évitement

Les [liens d'évitement](http://www.alsacreations.com/tuto/lire/572-Les-liens-d-evitement.html) sont prévus pour faciliter la navigation au clavier, ils sont indispensable dans une optique de parfaite accessibilité.

KNACSS propose des styles par défaut pour ces liens : masqués au départ, ils deviennent visibles lorsque la touche `tab` est utilisée.

```css
.skip-links {
  position: absolute;
}
.skip-links a {
  position: absolute;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0.5em;
  background: black;
  color: white;
  text-decoration: none;
}
.skip-links a:focus {
  position: static;
  overflow: visible;
  clip: auto;
}
```

## Césures

KNACSS gère automatiquement les césures et les mots longs dès lors que le point de rupture "$tiny" est atteint.

```
// hyphens on tiny screens
@media (max-width: $tiny) {
  /* you shall not pass */
  div,
  textarea,
  table,
  td,
  th,
  code,
  pre,
  samp {
    word-wrap: break-word;
    hyphens: auto;
  }
}

// use .no-wrapping to disallow hyphens on tiny screens
@media (max-width: $tiny) {
  .no-wrapping {
    word-wrap: normal;
    hyphens: manual;
  }
}
```
