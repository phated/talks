var { watch, src, dest, lastRun } = require('gulp');
var through = require('through2');
var pump = require('pump');

function log() {
  return through.obj(function(file, _, cb) {
    console.log(`Processing: ${file.path}`);
    cb(null, file);
  });
}

// a.k.a the streamLongerer
// a.k.a webpack
function delay() {
  return through.obj(function(file, _, cb) {
    setTimeout(cb, 250, null, file);
  });
}

function inc(done) {
  pump([
    src('lots-of-files/*.txt', { since: lastRun(inc) }),
    log(),
    delay(),
    dest('build')
  ], done);
}

function noinc(done) {
  pump([
    src('lots-of-files/*.txt'),
    log(),
    delay(),
    dest('build')
  ], done);
}

function demo() {
  watchTask = process.argv.includes('--inc') ? inc : noinc;
  watch('lots-of-files/*.txt', { ignoreInitial: false }, watchTask);
}

module.exports = { demo };
