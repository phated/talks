/*
  This file uses the .ts extension because
  TypeScript doesn't require a ton of config like babel
*/

import { series, parallel, src, dest } from 'gulp';
import pump = require('pump');
// For "clean" task
import rimraf = require('rimraf');
// For "html" task
import pug = require('gulp-pug');
// For "css" task
import less = require('gulp-less');
import minifyCSS = require('gulp-csso');
// For "js" task
import rollup = require('rollup-stream');
import source = require('vinyl-source-stream');
import buffer = require('vinyl-buffer');
import sourcemaps = require('gulp-sourcemaps');
import babel = require('gulp-babel');
import uglify = require('gulp-uglify');

function clean(done) {
  rimraf('build', done);
}

function html(done) {
  pump([
    src([
      'client/html/*.pug',
      '!client/html/_*.pug'
    ]),
    pug(),
    dest('build/html')
  ], done);
}

function css(done) {
  pump([
    src('client/css/*.less', { sourcemaps: true }),
    less(),
    minifyCSS(),
    dest('build/css', { sourcemaps: true })
  ], done);
}

function js(done) {
  pump([
    rollup({
      input: 'client/js/index.js', sourcemap: true, format: 'iife'
    }),
    source('app.js'),
    buffer(),
    // Looking to replace this soon
    sourcemaps.init({ loadMaps: true }),
    babel({ presets: ['env'] }),
    uglify(),
    dest('build/js', { sourcemaps: './' })
  ], done);
}

// export { html, css, js} // Just an example
export default series(
  clean,
  parallel(html, css, js)
);

/* If you aren't using a transpiler
module.exports = {
  html, css, js, // Just an example
  default: series(
    clean,
    parallel(html, css, js)
  )
};
*/
