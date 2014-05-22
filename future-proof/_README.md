KNACSS-canary is an **experimental version** for KNACSS.

No preprocessors, nos cheats. Only pure, standard CSS.

Uses :
- standards CSS variables
- calc()
- rem
- other standards

Needs :
- a CSS post-processor such as www.pleeease.io in order to polyfill every features used

Config :
- install nodeJS
- install Pleeease : `npm install pleeease -g`
- adjust `.pleeeaserc` config to your needs
- the `styles.css` file imports KNACSS and will be watched and compiled to `styles.min.css` with a simple `pleeease compile` or `pleeease watch` command
