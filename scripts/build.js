'use strict';

var gulp = require('gulp-help')(require('gulp'));
var config = require('../build.conf');

gulp.task('build', 'Copy the electron files', function() {
  return gulp
    .src(config.paths.electronrequiredfiles)
    .pipe(gulp.dest('dist/'));
});
