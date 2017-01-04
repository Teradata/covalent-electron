// Require any node modules to be used here
// Need to do this until able to modify webpack config in Angular CLI
var fs = require('fs');
var electron = require('electron');
var path = require('path');
// Add all 3rd party node_modules included in the Electron app to be able to be used
module.paths.push(path.resolve(electron.remote.app.getAppPath() + '/node_modules'));
require('electron-connect').client.create();