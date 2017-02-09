[![NPM Version](https://badge.fury.io/js/cordova-sqlite-devtools.svg)](https://badge.fury.io/js/sql-source-control)[![Build Status](https://travis-ci.org/justinlettau/cordova-sqlite-devtools.svg?branch=master)](https://travis-ci.org/justinlettau/cordova-sqlite-devtools)
[![Dependency Status](https://david-dm.org/justinlettau/cordova-sqlite-devtools.svg)](https://david-dm.org/justinlettau/cordova-sqlite-devtool)
[![Dev Dependency Status](https://david-dm.org/justinlettau/cordova-sqlite-devtool/dev-status.svg)](https://david-dm.org/justinlettau/cordova-sqlite-devtool?type=dev)

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
List all databases the device.

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

Where `awesome.db` is the name of the database to backup. Note: the database name is case sensitive.

## Delete Database Backups
Remove `_sqlite-backups` folder and all backups.

```
csd clean
```
