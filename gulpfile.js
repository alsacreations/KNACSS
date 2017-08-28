// Requires
var gulp = require('gulp');

// Include plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
// var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');


// tâche CSS = compile vers knacss.css et knacss-unminified.css
gulp.task('css', function () {
  return gulp.src('./sass/knacss.scss')
    .pipe(sass({
      outputStyle: 'expanded' // CSS non minifiée plus lisible ('}' à la ligne)
    }))
    .pipe(autoprefixer({ grid: true }))
    .pipe(rename('knacss-unminified.css'))
    .pipe(gulp.dest('./css/'))
    .pipe(rename('knacss.css'))
    //.pipe(sourcemaps.init())
    .pipe(minifycss())
    //.pipe(sourcemaps.write('.', {includeContent: false}))
    .pipe(gulp.dest('./css/'));
});

gulp.task('grillade', function() {
  return gulp.src('./sass/components/_grillade.scss')
    .pipe(gulp.dest('./css/'))
    .pipe(sass())
    .pipe(autoprefixer({ grid: true }))
    .pipe(minifycss())
    .pipe(gulp.dest('./css/'));
});

gulp.task('grillade-v6', function() {
  return gulp.src('./sass/components/_grillade-v6.scss')
    .pipe(gulp.dest('./css/'))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(gulp.dest('./css/'));
});

// Watcher
gulp.task('watch', function() {
  gulp.watch(['./sass/*.scss'], ['css']);
});


gulp.task('default', ['css']);
