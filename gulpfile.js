// Note : this gulpfile works with gulp 3.9.1. Won't work with gulp 4

// Requires
var gulp = require('gulp');

// Include plugins
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

var cssnano = require('cssnano'); // minifies CSS
var autoprefixer = require('autoprefixer');

var unprefix = require("postcss-unprefix"); // deletes old prefixes
var flexbugs = require('postcss-flexbugs-fixes'); // flexbox fixes for IE
var gaps = require('postcss-gap-properties'); // gaps polyfill

var plugins = [
  unprefix(),
  autoprefixer({
    grid: true
  }),
  flexbugs(),
  gaps()
];

var pluginsProd = [
  unprefix(),
  autoprefixer({
    grid: true
  }),
  flexbugs(),
  gaps(),
  cssnano()
];

// tâche cssDev = compile vers knacss-unminified.css
gulp.task('cssDev', function () {
  return gulp.src('./sass/knacss.scss')
    .pipe(sass({
      outputStyle: 'expanded' // CSS non minifiée plus lisible ('}' à la ligne)
    }))
    .pipe(postcss(plugins))
    .pipe(rename('knacss-unminified.css'))
    .pipe(gulp.dest('./css/'));
});

// tâche cssProd = compile vers knacss.css minifié
gulp.task('cssProd', function () {
  return gulp.src('./sass/knacss.scss')
    .pipe(sass())
    .pipe(postcss(pluginsProd))
    .pipe(gulp.dest('./css/'));
});

gulp.task('grillade', function () {
  return gulp.src('./sass/_library/grillade-grid.scss')
    .pipe(sass())
    .pipe(postcss(pluginsProd))
    .pipe(gulp.dest('./css/'));
});

gulp.task('grillade-flex', function () {
  return gulp.src('./sass/_library/grillade-flex.scss')
    .pipe(sass())
    .pipe(postcss(pluginsProd))
    .pipe(gulp.dest('./css/'));
});

// Watcher
gulp.task('watch', function () {
  gulp.watch(['./sass/*.scss'], ['cssDev']);
});


gulp.task('default', ['cssDev', 'cssProd', 'grillade', 'grillade-flex']);
