"use strict";

const gulp       = require('gulp');
const sass       = require('gulp-sass');
const cssMin     = require('gulp-cssmin');
const del        = require('del');
const sourcemaps = require('gulp-sourcemaps');

const sassPath = {
  src: 'app/sass/*.scss',
  dest: 'build/css'
};

function processSass() {
  return gulp.src(sassPath.src)
    .pipe(sass().on('error', sass.logError));
}

function build() {
  return processSass()
    .pipe(cssMin())
    .pipe(gulp.dest(sassPath.dest));
}

function dev() {
  return processSass()
    .pipe(sourcemaps.init())
    .pipe(cssMin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(sassPath.dest));
}

function watch() {
  return gulp.watch(sassPath.src, gulp.series(processSass));
}

exports.task = processSass;
exports.dev  = dev;
exports.build = build;
exports.watch = watch;
