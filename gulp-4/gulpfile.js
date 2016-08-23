'use strict';

const gulp        = require('gulp');
const del         = require('del');
const browserSync = require('browser-sync').create();

// Tasks
const scripts   = require('./tasks/scripts');
const sass      = require('./tasks/sass');
const html      = require('./tasks/html');

/**
 * @name clean
 * @description Apaga todo o diretório de build
 */
gulp.task('clean', function(done) {
  del('build/', done());
});

/**
 * @name browsersync
 * @description Inicia um servidor de desenvolvimento com livereload
 */
gulp.task('browsersync', function(done) {
  browserSync.init({
    server: {
      baseDir: ['build']
    },
    port: 9005,
    files: ['build/js', 'build/css']
  });

  done();
});

/**
 * @name default
 * @description Tasks compartilhadas
 */
gulp.task('default', gulp.series(
  sass.dev,
  scripts.dev,
  html.task,
  'browsersync'
));


/**
 * @name serve
 * @description Sobe um servidor de desenvolvimento e fica escutando por mudanças nos arquivos
 */
gulp.task('serve', gulp.parallel(
  'default',
  sass.watch,
  scripts.watch
));

/**
 * @name build
 * @description Gera um build para produção
 */
gulp.task('build', gulp.series(
  'clean',
  sass.build,
  scripts.build,
  html.task
));