var gulp = require('gulp');
// For "clean" task
var rimraf = require('rimraf');
// For "html" task
var pug = require('gulp-pug');
// For "css" task
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
// For "js" task
var rollup = require('rollup-stream');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

gulp.task('clean', function() {
  rimraf.sync('output');
});

gulp.task('html', ['clean'], function() {
  return gulp.src([
      'input/html/*.pug',
      '!input/html/_*.pug'
    ])
    .pipe(pug())
    .pipe(gulp.dest('output/html'))
});

gulp.task('css', ['clean'], function() {
  return gulp.src('input/css/*.scss')
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('output/css'))
});

gulp.task('js', ['clean'], function() {
  return rollup({
      input: 'input/js/index.js', sourcemap: true, format: 'iife'
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('output/js'))
});

gulp.task('default', ['html', 'css', 'js']);
