'use strict';

var gulp = require('gulp');
var chokidar = require('chokidar');
var spawn = require('child_process').spawn;
var runSequence = require('run-sequence');
var fs = require('fs');
var electron = require('electron-connect').server.create();
var rendered = false;
var changesDetected = false;

function getSpawn(command, args, options) {
  if (!/^win/.test(process.platform)) { // linux
    return spawn(command, args, {
      stdio: 'inherit'
    });
  } else { // windows
    return spawn('cmd', ['/s', '/c', command].concat(args), {
      stdio: [null, process.stdout, process.stderr]
    });
  }
}

// when using live-update mode set some environment variables so electron will use electron connect
process.env.LIVE_UPDATE = "true";
if (process.argv.find(function(args) {
    return args === '--openDevTools';
  })
) {
  process.env.OPEN_DEV_TOOLS = "true";
}

// kicks off all the tasks to run and watch for changes on src and electron files
gulp.task('watch', ['start-watch-src','watch-electron'], function (cb) {
    setTimeout(cb, 200);
});

// kicks off all the tasks to run and watch for changes on src files
gulp.task('start-watch-src', function (cb) {
    runSequence('copy','copy-electron-connect', 'npm-install','watch-src');
});

// copy over the electron-connect node_module to the dist dir
gulp.task('copy-electron-connect', function () {
    gulp.src(['node_modules/electron-connect/**'], {base: 'node_modules/'}).pipe(gulp.dest('dist/node_modules'));
});

// copy over the dist-ng dir to the dist dir
gulp.task('copy-dist-ng', function () {
    gulp.src(['dist-ng/**'], {base: 'dist-ng/'}).pipe(gulp.dest('dist'));
});

// copy over the dist-ng dir to the dist dir and reload electron
gulp.task('copy-dist-ng-and-reload', function () {
    if (rendered) {
      runSequence('copy-dist-ng', 'reload-electron');
    } else {
      runSequence('copy-dist-ng', 'start-electron');
      rendered = true;
    }
});

// copy over the dist-ng dir to the dist dir
gulp.task('changes-detected', function () {
    changesDetected = true;
});

// run npm install inside the dist dir
gulp.task('npm-install', function (cb) {
  var cmd = getSpawn('npm', ['run', 'npm-install']);
  cmd.on('close', function (code) {
      cb(code);
  });
});

// starts electron
gulp.task('start-electron', function () {
  // Start browser process
  electron.start('dist/');
});

// calls reload from electron-connect
gulp.task('reload-electron', function () {
  // Reload renderer process
  electron.broadcast("reloadit", "true");
});

var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

// watches the src files for changes
gulp.task('watch-src', 'Watch for changed files', function (cb) {  

  if (/^win/.test(process.platform)) { // windows
    deleteFolderRecursive('dist-ng');

    if (!fs.existsSync('dist-ng')){
       fs.mkdirSync('dist-ng');
    }

    chokidar.watch('.', {
      persistent: true,
      ignorePermissionErrors: true,
      atomic: 2000,
      awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100
      },
    }).on('all', (event, path) => {
      if ((event === 'add' || event === 'change') && path.indexOf('dist-ng') > -1) {
        runSequence('changes-detected');
      }
    });
  }

  // Reload renderer process after files change
  var cmd = getSpawn('ng', ['build', '--watch', '--output-path', 'dist-ng']);
  cmd.on('close', function (code) {
      cb(code);
  });

  if (!/^win/.test(process.platform)) { // linux
    chokidar.watch('dist-ng/**/*', {
      persistent: true,
    }).on('addDir', function(event, path) {
      runSequence('changes-detected');
    }).on('change', function(event, path) {
      runSequence('changes-detected');
    });
  }
});

// check every 3 seconds if ng build has run
setInterval(
  function(){
    if (changesDetected) {
      changesDetected = false;
      runSequence('copy-dist-ng-and-reload');
    }
}, 3000);

// called when an electron file has been changed
gulp.task('restart', function (cb) {
  var cmd = getSpawn('echo', ['"restarting"']);
  cmd.on('close', function (code) {
      runSequence('copy', 'copy-electron-connect', 'restart-electron');
      cb(code);
  });
});

// calls reload from electron-connect
gulp.task('restart-electron', function () {
  // Reload renderer process
  electron.restart();
});

// watches the electron files for changes
gulp.task('watch-electron', 'Watch for changed files', function (cb) {  
  // Reload main process after files change
  gulp.watch(['electron/**/*'], ['restart']);
});