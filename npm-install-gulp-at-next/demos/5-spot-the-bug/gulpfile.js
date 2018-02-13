var gulp = require('gulp');
var rimraf = require('./rimraf');
var path = require('path');

/* Spot the bug #1 */
gulp.task('clean', function() {
  rimraf('./build')
});

gulp.task('build', ['clean'], function() {
  return gulp.src('lots-of-files/*.txt')
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['build']);

/* Spot the bug #2 */
// gulp.task('clean', function(cb) {
//   rimraf('./build', cb)
// });

// gulp.task('build', function() {
//   return gulp.src('lots-of-files/*.txt')
//     .pipe(gulp.dest('build'));
// });

// gulp.task('default', ['clean', 'build']);

/* Spot the bug #3 - Only causes problems on Windows */
/* Specific to gulp 4 */
// var dirs = [
//   'lots-of-files'
// ];

// gulp.task('default', function() {
//   var globs = dirs.map((dir) => path.join(__dirname, dir, '*.txt'));
//   return gulp.src(globs)
//     .pipe(gulp.dest('build'))
// });
