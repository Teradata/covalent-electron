'use strict';

var gulp = require('gulp');
var spawn = require('child_process').spawn;
var runSequence = require('run-sequence');
var electron = require('electron-connect').server.create();

gulp.task('watch', function (cb) {
  var cmd = spawn('ng', ['build'], {stdio: 'inherit'});
  cmd.on('close', function (code) {
      runSequence('copy','copy-electron-connect', 'start-electron','watch-src');
      cb(code);
  });
});

gulp.task('reload', function (cb) {
  var cmd = spawn('ng', ['build'], {stdio: 'inherit'});
  cmd.on('close', function (code) {
      runSequence('copy', 'copy-electron-connect', 'reload-electron');
      cb(code);
  });
});

gulp.task('copy-electron-connect', function () {
    gulp.src(['node_modules/electron-connect/**'], {base: 'node_modules/'}).pipe(gulp.dest('dist/node_modules'));
});

gulp.task('start-electron', function () {
  // Start browser process
  electron.start('dist/');
});

gulp.task('reload-electron', function () {
  // Reload renderer process
  electron.restart();
});

gulp.task('watch-src', 'Watch for changed files', function (cb) {  
  // Reload renderer process after files change
  gulp.watch(['src/**/*'], ['reload']);
});