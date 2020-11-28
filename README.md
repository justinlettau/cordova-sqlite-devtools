[![NPM Version](https://badge.fury.io/js/cordova-sqlite-devtools.svg)](https://badge.fury.io/js/cordova-sqlite-devtools)
[![CI](https://github.com/justinlettau/cordova-sqlite-devtools/workflows/CI/badge.svg)](https://github.com/justinlettau/cordova-sqlite-devtools/actions)
[![Dependency Status](https://david-dm.org/justinlettau/cordova-sqlite-devtools.svg)](https://david-dm.org/justinlettau/cordova-sqlite-devtools)
[![Dev Dependency Status](https://david-dm.org/justinlettau/cordova-sqlite-devtools/dev-status.svg)](https://david-dm.org/justinlettau/cordova-sqlite-devtools?type=dev)

# Cordova SQLite Devtools

A quick and easy way to pull a backup of a sqlite database from a connected Android device.

# Installation

```
npm install -g cordova-sqlite-devtools
```

# Usage

`cordova-sqlite-devtools` uses [Android Debug Bridge (adb)](https://developer.android.com/studio/command-line/adb.html)
to communicate with your Android device. Make sure you have `adb` installed / configured, and you
have connected your mobile phone to your laptop / desktop.

```
csd --help
```

## List Databases

List all databases on the device.

```
csd list
```

## Pull Database Backup

With the below command, you should be able to find the database copied into the `_sqlite-backups`
folder of the current directory. Use [SQLite browser](http://sqlitebrowser.org/) to open the
database and browse the data.

```
csd pull awesome.db
```

Where `awesome.db` is the optional name of the database to backup. Note: the database name is case
sensitive. If the database is not provided, you will be prompted to select from a list of available
databases on the device.

## Delete Database Backups

Remove `_sqlite-backups` folder and all backups.

```
csd clean
```

## Generate

Combine all SQL files into a JavaScript file that adds all SQL queries to an object on the window (`window._sqlite`).
The generated file can be included (`<script src="build/sqlite.js"></script>`) and the queries accessed from code. For example,
if your SQL file is named `MyAwesomeQuery.sql`, then you can access the query via `window._sqlite['MyAwesomeQuery']`.

```
csd generate
```

### Options

| Name     | Alias | Description                  | Default               |
| -------- | ----- | ---------------------------- | --------------------- |
| `--src`  | `-s`  | Source glob of sql files.    | `src/sqlite/**/*.sql` |
| `--dest` | `-d`  | Destination JavaScript file. | `www/build/sqlite.js` |

# Development

For easy development, clone the repo and run the following commands in the `cordova-sqlite-devtools` directory:

```bash
npm install
npm link
npm run build
```
