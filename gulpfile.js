// Requires
var gulp = require('gulp');

// Include plugins
var less = require('gulp-less');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// Common tasks
gulp.task('styles', ['styles-less']);
gulp.task('doallthethings', ['styles-less']);


// Styles LESS
gulp.task('styles-less', function () {
  return gulp.src('./less/knacss.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(rename('knacss-unminified.css'))
    .pipe(gulp.dest('./css/'))
    .pipe(rename('knacss.css'))
    .pipe(sourcemaps.init())
    .pipe(minifycss({keepBreaks:false,keepSpecialComments:0}))
    .pipe(sourcemaps.write('.', {includeContent: false}))
    .pipe(gulp.dest('./css/'));

});

// Watcher
gulp.task('watch', function() {
  gulp.watch(['./less/*.less'], ['styles-less']);
});

gulp.task('default', ['doallthethings']);