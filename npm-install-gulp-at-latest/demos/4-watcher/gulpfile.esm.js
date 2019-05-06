import { watch } from 'gulp';

function js(done) {
  // Faking a long running task
  setTimeout(done, 1500);
}

export default () => {
  const watchOpts = {
    // ignoreInitial: false,
    // queue: false,
    // delay: 750,
  };
  const watcher = watch('input/**/*.js', watchOpts, js);

  // Just for demonstration purposes
  watcher.on('change', () => console.log('something changed'));
};
