// Require any node modules to be used here
// Need to do this until able to modify webpack config in Angular CLI
var fs = require('fs');
var electron = require('electron');
var path = require('path');
module.paths.push('/Users/js186150/Documents/public/covalent-electron/dist/node_modules');
require('electron-connect').client.create();