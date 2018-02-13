var { registry, series } = require('gulp');
var MetadataRegistry = require('undertaker-task-metadata');
var CommonTasksRegistry = require('undertaker-common-tasks');

/* Provides custom logic */
registry(new MetadataRegistry());

function one(done) {
  console.log(this.name);
  done();
}

function two(done) {
  console.log(this.name);
  done();
}

module.exports = {
  one,
  two,
};

/* Provides pre-defined tasks */
// registry(new CommonTasksRegistry());
