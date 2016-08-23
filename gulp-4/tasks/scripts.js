"use strict";

const gulp       = require('gulp');
const concat     = require('gulp-concat');
const eslint     = require('gulp-eslint');
const uglify     = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

const scriptsPath = {
  src: [
    'app/**/*.js'
  ],
  dest: 'build/js'
};

function pre() {
  return gulp.src(scriptsPath.src)
    .pipe(eslint(gulp.src('./.eslintrc')))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
}

function build() {
  return pre()
    .pipe(concat('build.js'))
    .pipe(uglify())
    .pipe(gulp.dest(scriptsPath.dest));
}

function dev() {
  return pre()
    .pipe(uglify())
    .pipe(sourcemaps.init())
    .pipe(concat('build.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(scriptsPath.dest));
}

function lint() {
  return pre();
}

function watch() {
  return gulp.watch(scriptsPath.src, gulp.series(dev));
}

exports.dev = dev;
exports.build = build;
exports.lint = lint;
exports.watch = watch;
