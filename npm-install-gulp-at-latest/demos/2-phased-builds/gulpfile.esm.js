import { src, dest } from 'gulp';
import { pipeline } from 'stream';
import sass from 'gulp-sass';
import minifyCSS from 'gulp-clean-css';
import rename from 'gulp-rename';

function css() {
  return pipeline([
    src('input/css/*.scss'),
    sass(),
    dest('output/css'),
    src('vendor/*.css'),
    minifyCSS(),
    rename({ extname: '.min.css' }),
    dest('output/css')
  ]);
}

export default css;
