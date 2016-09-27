# Positionnements avec KNACSS

Au-delà des alignements d'éléments, KNACSS permet de positionner et d'architecturer vos gabarits à travers plusieurs solutions.

Dans cette page de documentation, nous étudierons en détail chaque cas concret auquel vous risquez d'être confronté et proposerons une réponse adaptée.

## Différents choix offerts

Les types de positionnements inclus nativement dans KNACSS sont les suivants :

- positionnement flottant
- positionnement avec `display: inline-block`
- positionnement avec Flexbox

Il n'y a pas de mystère : chaque type de positionnement est capable de répondre à différents types de contraintes. Il n'y a pas de meilleur choix qu'un autre.

Votre décision pourra être guidée par les indices suivants :
- il est généralement plus profitable de ne pas opter pour des positionnement hors-flux (`float`, `position: absolute`)
- Flexbox est certainement le modèle le plus polyvalent et propre, il est compatible qu'à partir de IE10+.

## Concrètement : je veux faire quoi ?

### Deux blocs voisins de largeur fixe

![Deux blocs voisins de largeur fixe](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/doc/illust/03-layout1.png)

Les choix offerts avec KNACSS :

#### flottant et flottant

La classe `.fl` pour `float: left` permet à un élément d'être flottant à gauche.

Il vous suffit de faire flotter vos deux éléments et de leur attribuer la largeur souhaitée pour qu'ils s'affichent l'un à côté de l'autre :

HTML :
```html
<div class="fl w400p">premier</div>
<div class="fl w400p">deuxième</div>
```

- **Avantage :** simple, rapide, intuitif, hyper compatible
- **Inconvénient :** positionnement hors du flux, nécessitera des ajustements (clearfix et autres anti-débordements)

#### inline-block et inline-block

La propriété `display: inline-block` (sous forme de classe `.inbl` chez KNACSS) permet à un élément de s'afficher tel un "inline" tout en étant dimensionné.

HTML :
```html
<div class="inbl w400p">premier</div>
<div class="inbl w400p">deuxième</div>
```

- **Avantage :** positionnement dans le flux, compatible dès IE8
- **Inconvénient :** un espace "whitespace" apparaîtra entre les deux div et nécessitera de coller les balises ou de bidouiller en CSS pour être supprimé


#### Flexbox

HTML :
```html
<div class="flex-container">
    <div class="w400p">premier</div>
    <div class="w400p">deuxième</div>
</div>
```

- **Avantage :** fluide, propre, simple
- **Inconvénient :** compatibilité IE10 minimum

### Deux blocs voisins dont un fixe et un fluide

![Deux blocs voisins de largeur fixe et fluide](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/doc/illust/03-layout2.png)

Les choix offerts avec KNACSS :

#### flottant et .mod

HTML :
```html
<div class="fl w400p">premier</div>
<div class="mod">deuxième</div>
```

#### inline-block et inline-block

Pas possible


#### Flexbox

HTML :
```html
<div class="flex-container">
    <div class="w400p">premier</div>
    <div class="flex-item-fluid">deuxième</div>
</div>
```

### Deux blocs voisins de même hauteur

![Deux blocs voisins de même hauteur](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/doc/illust/03-layout3.png)

Les choix offerts avec KNACSS :

#### flottant et flottant

Pas possible

#### inline-block et inline-block

Pas possible


#### Flexbox

Là aussi c'est automatique : les enfants d'un conteneur `flexbox` ont tous par défaut la même hauteur.

HTML :
```html
<div class="flex-container">
    <div>premier</div>
    <div>deuxième</div>
</div>
```

### Plusieurs blocs voisins de même taille

![grilles](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/doc/illust/03-layout4.png)

Si vous souhaitez réaliser des constructions de plusieurs éléments de même taille (fixe ou fluide) avec ou sans espace entre les éléments (gouttière), je vous invite à prendre connaissance des possibilités de **grilles** offertes par KNACSS.

Voir **[la Doc au point 03-grilles](https://github.com/raphaelgoetter/KNACSS/blob/master/doc/03-grilles.md)**.

### Schnaps.it, générateur de templates KNACSS

Alsacréations tient à jour un générateur de gabarits HTML/CSS basé sur le framework KNACSS, **[Schnaps.it](http://schnaps.it/)**, n'hésitez pas à en user et en abuser&nbsp;!

![grilles](https://raw.githubusercontent.com/raphaelgoetter/KNACSS/master/doc/illust/schnapsit.png)
