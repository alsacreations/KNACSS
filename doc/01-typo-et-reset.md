# Typographie

Accessible avant tout, KNACSS propose une gamme de tailles de polices d'unités fluides (`em`, `rem`) plutôt que le pixel, figé et non malléable, donc moint accessible.

En résumé, voilà les bases typographiques de KNACSS :

- choix d'unités fluides (`em`, `rem`)
- taille de police définie à 62.5% sur HTML (soit un équivalent de 10px, très pratique pour les conversions en rem)
- taille de base des contenus de 1.4em (soit un équivalent de 14px) modifiable dans la configuration LESS / Sass
- tailles de polices définies pour les niveaux de titres et des modificateurs tels que `.small`, `.smaller`, `.big`, `.bigger`, etc.

# Reset "light"

Le reset de KNACSS est volotairement minimal, le but n'étant pas de tout mettre à zéro pour le redéfinir par la suite.

La feuille de style débute ainsi par une variante de l'incontournable `* {box-sizing: border-box}` afin d'imposer le très pratique modèle de boîte CSS3 à tous les éléments du document.

S'en suivent quelques mises à zéro de marges, alignements par défaut des images, et quelques spécificités sur des élements tels que `blockquote`, `figure`, `canvas`, `video` ou autres `svg`.
