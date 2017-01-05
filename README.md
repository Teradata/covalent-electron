## Covalent-Electron is the Electron Platform to build desktop apps using Covalent and Electron

[![Build Status](https://travis-ci.org/Teradata/covalent.svg?branch=develop)](https://travis-ci.org/Teradata/covalent)
[![npm version](https://badge.fury.io/js/%40covalent%2Fcore.svg)](https://badge.fury.io/js/%40covalent%2Fcore)
[![Join the chat at https://gitter.im/Teradata/covalent](https://badges.gitter.im/Teradata/covalent.svg)](https://gitter.im/Teradata/covalent?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Dependency Status](https://dependencyci.com/github/Teradata/covalent/badge)](https://dependencyci.com/github/Teradata/covalent)

<img alt="Covalent" src="https://cdn.rawgit.com/Teradata/covalent/develop/src/app/assets/icons/covalent-and-electron.svg" width="642">
Covalent is a reusable UI platform from Teradata for building web applications with common standards and tooling. It is based on Angular 2 and Material Design.
Covalent-Electron is the Electron Platform to build desktop apps using Covalent and Electron
## Setup

### Production Build

* Ensure you have Node 4.4 and NPM 3+ installed.
* Install `npm install`
* Create Electron package `npm run package`
 * For a system running OS X the dist-app/Covalent-darwin-x64/Covalent.app folder generated can be executed. 
 * For a Windows x64 build the Covalent-win32-x64/Covalent.exe can be executed.

### Development Build
The development build include the ability to "live-reload" code in both the renderer process and the main electron application.
After running the commands below simply save a file in the code base and it will be automatically refreshed in the running Electron application

* Ensure you have Node 4.4 and NPM 3+ installed.
* Install `npm install`
* Create Electron package and run live-reload `npm run live-reload`

Alternatively if you want to also open the Dev Tools while running live-reload run this command instead
* Create Electron package and run live-reload `npm run live-reload -- --openDevTools`

---

* [Contributing Guidelines](docs/CONTRIBUTING.md)