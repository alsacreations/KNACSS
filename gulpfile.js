// Requires
var gulp = require('gulp');

// Include plugins
var less = require('gulp-less');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
// var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');


// tâche CSS = compile vers knacss.css et knacss-unminified.css
gulp.task('css', function () {
  return gulp.src('./less/knacss.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(rename('knacss-unminified.css'))
    .pipe(gulp.dest('./css/'))
    .pipe(rename('knacss.css'))
    //.pipe(sourcemaps.init())
    .pipe(minifycss())
    //.pipe(sourcemaps.write('.', {includeContent: false}))
    .pipe(gulp.dest('./css/'));
});

gulp.task('grillade', function() {
  return gulp.src(['./less/_00-config.less', './less/_03-grids.less'])
    .pipe(concat('grillade.less'))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(gulp.dest('./css/'));
});

// Watcher
gulp.task('watch', function() {
  gulp.watch(['./less/*.less'], ['css']);
});

gulp.task('default', ['css']);
