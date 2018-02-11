var gulp = require('gulp');
// For "clean" task
var rimraf = require('rimraf');
// For "html" task
var pug = require('gulp-pug');
// For "css" task
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
// For "js" task
var rollup = require('rollup-stream');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

gulp.task('clean', function() {
  rimraf.sync('build');
});

gulp.task('html', ['clean'], function() {
  return gulp.src(['client/html/*.pug', '!client/html/_*.pug'])
    .pipe(pug())
    .pipe(gulp.dest('build/html'))
});

gulp.task('css', ['clean'], function() {
  return gulp.src('client/css/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'))
});

gulp.task('js', ['clean'], function() {
  return rollup({ input: 'client/js/index.js', sourcemap: true, format: 'iife' })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(babel({ presets: ['env'] }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build/js'))
});

gulp.task('default', ['html', 'css', 'js']);
