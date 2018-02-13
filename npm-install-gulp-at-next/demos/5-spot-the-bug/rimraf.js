/* Working around some rimraf stuff for dramatic effect */
var ogRimraf = require('rimraf');

function noop() {}

function rimraf(filepath, cb) {
  cb = cb || noop;
  /* delaying for effect */
  setTimeout(ogRimraf, 250, './build', cb);
}

module.exports = rimraf;
