/*
  Uncomment the metadata lines and run `gulp --tasks`
*/

function html(done) {
  done();
}
// html.description = 'Generate HTML files from Pug templates.';
// html.flags = {
//   '--client': 'Instead generate compiled JS functions.'
// };

function css(done) {
  done();
}
// css.description = 'Compile and minify Less templates.';
// css.flags = {
//   '--inline-sourcemaps': 'Inline sourcemaps in the output instead of separate files.',
//   '--no-minify': 'Avoid the minify step.'
// };

function js(done) {
  /* Usage (there's no magic happening) */
  // if(process.argv.includes('--prod')) {
  //   console.log('Building for production instead!');
  //   return done();
  // }

  // console.log('Building for development.');

  done();
}
// js.description = 'Extremely complex JS build pipeline, cuz JS.';
// js.flags = {
//   '--prod': 'Sets process.env.NODE_ENV to "production" and builds for production.'
// };

module.exports = { html, css, js };
