# Alignements

Différentes classes utilitaires intégrées à KNACSS sont prévues pour gérer les alignements d'éléments.

- les textes et contenus "inline" sont gérés via les classes `.txtleft`, `.txtright` et `.txtcenter` qui agiront sur la propriété CSS `text-align`
- les blocs sont alignés avec les classes `.left`, `.right` et `.center` qui affectent la valeur `auto` à la propriété `margin`
- les flottements sont gérés via les classes `.fl` (pour `float: left`) et `.fr` (pour `float: right`)

## Cas des flottants et les .mod

Le positionnement flottant compte parmi les plus employés mais n'est pas exempt d'inconvénients. Le principal étant d'être un positionnement hors du flux qui nécessitera des ajustements (clearfix et autres anti-débordements).

KNACSS a prévu des classes spécifiques pour mieux vous en sortir avec les flottants :

- **le super élément `.mod`**. Il a plein d'avantages: il contient les flottants (ils ne débordent pas) et il ne s'écoule pas autour d'un frère flottant (il s'affiche proprement à côté) et il crée un [contexte "BFC"](http://www.alsacreations.com/astuce/lire/1543-le-contexte-de-formatage-block-en-css.html)
- `.clearfix`. Les éléments disposant de cette classe contiennent les flottants, tel les `.mod`
- les éléments `.clear`, `.line` et `.row` bénéficient d'un autre pouvoir : celui de toujours se pousser sous un flottant précédent. Il sont dédiés aux empilements verticaux des contenus.

## Concrètement : je veux faire quoi ?

### Centrer horizontalement

#### Du texte ou une image

HTML :
```html
<div class="txtcenter">
    <img src="licorne.png" alt="aïe ça pique">
</div>
```

#### Un bloc

HTML :
```html
<section>
    <div class="center w50">centré horizontalement</div>
</section>
```

### Centrer verticalement

![centrer verticalement](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/doc/illust/02-layout.png)

Version table-cell (HTML) :
```html
<section class="col">
    <div class="w50 center">centré horizontalement et verticalement</div>
</section>
```

Version table-cell (CSS) :
```css
section {
    vertical-align: middle;
}
```

Version flexbox (HTML):
```html
<section class="flex-container-v">
    <div class="center w50">centré horizontalement et verticalement</div>
</section>
```
