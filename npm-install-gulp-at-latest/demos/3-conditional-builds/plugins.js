// A little demo magic in here

const through2 = require('through2');
const { cyan, magenta, yellow, bold } = require('ansi-colors');

function log(prefix) {
  return through2.obj(function(file, _, cb) {
    console.log(prefix, file.relative);
    cb(null, file);
  });
}

exports.debug = function() {
  return log(bold('[debug]'));
};

exports.autoprefixer = function() {
  return log(cyan('[autoprefixing file]'));
};

exports.uglify = function() {
  return log(magenta('[uglifying file]'));
};

exports.rev = function() {
  return log(yellow('[revving file]'))
}
