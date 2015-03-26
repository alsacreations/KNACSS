# Tableaux de données

KNACSS propose une feuille de style minimale appliquée aux tableaux de données ainsi qu'aux éléments disposant d'une classe `.table`.

Pour débuter, KNACSS impose un modèle d'affichage fixé à tous les tableaux via `table-layout: fixed;`. Ainsi, ce ne sera plus le contenu qui décidera de la largeur des cellules, mais ce que vous aurez spécifié dans les tailles CSS.

```css
table,
.table {
  width: 100%;
  max-width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  vertical-align: top;
  border: 1px solid #ccc;
}
.table {
  display: table;
}
table#recaptcha_table,
table.table-auto {
  table-layout: auto;
}
caption {
  padding: 10px;
  color: #555;
  font-style: italic;
}
td,
th {
  padding: 0.3em 0.8em;
  border: 1px #aaa dotted;
  vertical-align: top;
  min-width: 20px;
  cursor: default;
  text-align: left;
}
```
