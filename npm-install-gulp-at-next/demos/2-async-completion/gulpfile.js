var { src, dest } = require('gulp');
var { Observable } = require('rxjs');
var cp = require('child_process');
var { EventEmitter } = require('events');
var rimraf = require('rimraf');

function stream() {
  return src('./package.json')
    .pipe(dest('build'));
}

function promise() {
  return Promise.resolve('Value is ignored');
}

function ee() {
  var emitter = new EventEmitter();
  process.nextTick(() => emitter.emit('finish'));
  return emitter;
}

function child() {
  return cp.exec('ls');
}

function observable() {
  return Observable.of(1, 2, 3);
}

function callback(done) {
  done();
}

/* Doesn't work */
function sync() {
  rimraf.sync('build');
}

/* Can use async/await for pseudo-sync */
async function asyncAwait() {
  rimraf.sync('build');

  /* or you can actually use `await` in here */
  // return await Promise.resolve('awaited result');
}

module.exports = {
  stream,
  promise,
  ee,
  child,
  observable,
  callback,
  sync,
  asyncAwait
};
