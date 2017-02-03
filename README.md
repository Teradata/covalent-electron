## Covalent-Electron is the Electron Platform to build desktop apps using Covalent and Electron

[![Build Status](https://travis-ci.org/Teradata/covalent.svg?branch=develop)](https://travis-ci.org/Teradata/covalent)
[![npm version](https://badge.fury.io/js/%40covalent%2Fcore.svg)](https://badge.fury.io/js/%40covalent%2Fcore)
[![Join the chat at https://gitter.im/Teradata/covalent](https://badges.gitter.im/Teradata/covalent.svg)](https://gitter.im/Teradata/covalent?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Dependency Status](https://dependencyci.com/github/Teradata/covalent/badge)](https://dependencyci.com/github/Teradata/covalent)

<img alt="Covalent" src="https://cdn.rawgit.com/Teradata/covalent-electron/develop/src/app/assets/icons/covalent-and-electron.svg" width="503">

Covalent is a reusable UI platform from Teradata for building web applications with common standards and tooling. It is based on Angular 2 and Material Design.

Covalent Github Repo: https://github.com/Teradata/covalent

Covalent-Electron is the Electron Platform to build desktop apps using Covalent and Electron
## Setup

### Production Build

* Ensure you have Node 4.4 and NPM 3+ installed.
* Install `npm install`
* Create Electron package `npm run package`
 * For a system running OS X the dist-app/Covalent-darwin-x64/Covalent.app folder generated can be executed. 
 * For a Windows x64 build the Covalent-win32-x64/Covalent.exe can be executed.

### Development Build
The development build includes the ability to "live-reload" code in both the renderer process and the main electron application.
After running the commands below simply save a file in the code base and it will be automatically refreshed in the running Electron application

* Ensure you have Node 4.4 and NPM 3+ installed.
* Install `npm install`
* Create Electron package and run live-reload `npm run live-reload`

Alternatively if you want to also open the Dev Tools while running live-reload run this command instead
* Create Electron package and run live-reload `npm run live-reload -- --openDevTools`

---

## Using Node Modules
To use Node Modules in Covalent Electron there are a few steps you need to take.  Covalent is built off of Angular 2 and uses typescript as its coding language.  To allow Node Modules to be used in this framework with Electron you will need to follow the steps below.

### Internal Node.js/Electron Node Modules

* Add to [electron-load.js](https://github.com/Teradata/covalent-electron/blob/develop/src/electron-load.js) the requires for the node_module you want to use, for example, if you had a node_module called "some_node_module", then add:

`var some_node_module = require('some_node_module');`

 Make sure to require this after the section:
```
/*
 * Require external node modules here
 */
```
This is because the line above:

`module.paths.push(path.resolve(electron.remote.app.getAppPath() + '/node_modules'));`

is what makes the node_modules available to electron

* Declare this variable in [src/typings.d.ts](https://github.com/Teradata/covalent-electron/blob/develop/src/typings.d.ts). This will allow typescript to not complain about the use of the node_module. For example:

`declare var some_node_module: any;`

* Then in your typescript file for your component you should be able to use the node_module directly, for example:

`some_node_module.xyz();`

After these 3 steps you should be able to use an internal node_module.


### External Node.js/Electron Node Modules

* Include the module in the [electron/package.json](https://github.com/Teradata/covalent-electron/blob/develop/electron/package.json) dependencies. To note: this is different than the package.json at the top of the source tree. The package.json in electron/package.json is for node_modules you want to actually be included in the electron app. The ones listed in the package.json at the top of the source tree will not be included in the electron app. For example, if you had a node_module called "some_node_module", then add:

`"dependencies": { "some_node_module": "^0.0.1" },`

* Add to [electron-load.js](https://github.com/Teradata/covalent-electron/blob/develop/src/electron-load.js) the requires for the node_module you want to use.  For example:

`var some_node_module = require('some_node_module');`

 Make sure to require this after the section:
```
/*
 * Require external node modules here
 */
```
This is because the line above:

`module.paths.push(path.resolve(electron.remote.app.getAppPath() + '/node_modules'));`

is what makes the node_modules available to electron

* Declare this variable in [src/typings.d.ts](https://github.com/Teradata/covalent-electron/blob/develop/src/typings.d.ts). This will allow typescript to not complain about the use of the node_module. For example:

`declare var some_node_module: any;`

* Then in your typescript file for your component you should be able to use the node_module directly, for example:

`some_node_module.xyz();`

After these 4 steps you should be able to use an external node_module.

---

* [Contributing Guidelines](docs/CONTRIBUTING.md)