## Covalent-Electron is the Electron Platform to build desktop apps using Covalent and Electron

[![Build Status](https://travis-ci.org/Teradata/covalent.svg?branch=develop)](https://travis-ci.org/Teradata/covalent-electron)
[![Join the chat at https://gitter.im/Teradata/covalent](https://badges.gitter.im/Teradata/covalent.svg)](https://gitter.im/Teradata/covalent?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

<img alt="Covalent" src="https://gitcdn.link/repo/Teradata/covalent/develop/src/assets/icons/covalent.svg" width="150">

Covalent is a reusable UI platform from Teradata for building web applications with common standards and tooling. It is based on Angular 2 and Material Design.

Covalent Github Repo: https://github.com/Teradata/covalent

Covalent-Electron is the Electron Platform to build desktop apps using Covalent and Electron

Covalent-Code-Editor is an Angular Component for text and code editing based on Covalent and Monaco Editor. The component can run in both Electron and Web Browsers.

Covalent-Code-Editor Github Repo: https://github.com/Teradata/covalent-code-editor

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

To run VsCode and attach as the Debugger to Covalent Electron see here:
* Debugging in VsCode with Live Reload in Covalent Electron:

  https://github.com/Teradata/covalent-electron/wiki/Debugging-with-VS-Code-with-Electron

---

## Including Node Modules in Covalent Electron
To utilize "internal" (eg. fs, path, etc.) or "3rd party" (eg. winston, uuid, monaco-editor, etc.) node modules from within your Covalent Electron application, you must perform the following steps to ensure the node modules are accessible. Assume for this example you want to utilize a node module named "some_node_module".

1. Add the require for the module in [src/electron-load.js](https://github.com/Teradata/covalent-electron/blob/develop/src/electron-load.js) in the below location

    ```
    /*
    * Require external node modules here
    */
    var some_node_module = require('some_node_module');
    ```
    Make sure it is below the line:

    `module.paths.push(path.resolve(electron.remote.app.getAppPath() + '/node_modules'));`

    This line is where the node_modules directory becomes available to electron

2. Declare a corresponding variable in [src/typings.d.ts](https://github.com/Teradata/covalent-electron/blob/develop/src/typings.d.ts) to ensure the compiler does not complain about references to the module in Typescript.

    `declare var some_node_module: any;`

3. If the node module is a "3rd party" module, include the module as a dependency in the [electron/package.json](https://github.com/Teradata/covalent-electron/blob/develop/electron/package.json). This is a separate package.json, differentiated from the top level package.json, that defines modules you want to be accessible in the electron app.

    `"dependencies": { "some_node_module": "^0.0.1" },`


4. In your Typescript, you can now reference the module as follows.

    `some_node_module.xyz();`

---

## Running Unit Tests in Covalent Electron
Covalent Electron utilizes Karma and ng test to execute unit tests inside an Electron Test Harness. The tests can be run against a standalone Angular 2 Component, an Angular 2 component that uses "internal" node modules, or an Angular 2 component that uses "3rd party" (eg. winston, uuid, monaco-editor, etc.) node modules

* Simply Run `npm run test`

* Example Test Files:

  * (https://github.com/Teradata/covalent-electron/blob/develop/src/platform/file-select/file-select.component.spec.ts) 
  * (https://github.com/Teradata/covalent-electron/blob/develop/src/platform/monaco-editor/monaco-editor.component.spec.ts) 

---

* [Contributing Guidelines](docs/CONTRIBUTING.md)
