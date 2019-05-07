import { series, parallel, src, dest } from 'gulp';
import { pipeline } from 'stream';
// For "clean" task
import rimraf from 'rimraf';
// For "html" task
import pug from 'gulp-pug';
// For "css" task
import sass from 'gulp-sass';
import minifyCSS from 'gulp-csso';
// For "js" task
import rollup from 'rollup-stream';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';

function clean(done) {
  rimraf('output', done);
}

function html() {
  return pipeline([
    src([
      'input/html/*.pug',
      '!input/html/_*.pug'
    ]),
    pug(),
    dest('output/html')
  ]);
}

function css() {
  return pipeline([
    src('input/css/*.scss', { sourcemaps: true }),
    sass(),
    minifyCSS(),
    dest('output/css', { sourcemaps: true })
  ]);
}

function js() {
  return pipeline([
    rollup({
      input: 'input/js/index.js', sourcemap: true, format: 'iife'
    }),
    source('app.js'),
    buffer(),
    // Looking to replace this soon
    sourcemaps.init({ loadMaps: true }),
    babel({ presets: ['@babel/preset-env'] }),
    uglify(),
    dest('output/js', { sourcemaps: './' })
  ]);
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
