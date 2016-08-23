const gulp = require('gulp');

const htmlPath = {
  src: [
    'app/index.html'
  ],
  dest: 'build/'
};

function task() {
  return gulp.src(htmlPath.src)
    .pipe(gulp.dest(htmlPath.dest));
}

exports.task = task;
