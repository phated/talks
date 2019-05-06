import { src, dest, symlink } from 'gulp';
import { pipeline } from 'stream';
import gulpIf from 'gulp-if';
import { autoprefixer, uglify, rev, debug } from './plugins';

function build() {
  return pipeline([
    src('input/{css,img,js}/*'), // Notice no extension?
    debug(),
    gulpIf('*.css', autoprefixer()),
    gulpIf('*.js', uglify()),
    gulpIf(process.env.NODE_ENV === 'production', rev()),
    gulpIf('*.png', symlink('./output'), dest('./output'))
  ]);
}

export default build;
