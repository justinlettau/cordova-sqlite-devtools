# Cordova SQLite Devtools
A quick and easy way to pull a backup of a sqlite database from a connected Android device.

# Installation
```
npm install -g cordova-sqlite-devtools
```

# Usage
```
csb --help
```


## Pull Database Backup
Make sure you have connected your mobile phone to your laptop / desktop. With the below command, you
should be able to find the database copied into the `_sqlite-backups` folder of the current directory.
Use [SQLite browser](http://sqlitebrowser.org/) to open the database and browse the data.

```
csb pull awesome.db
```

Where `awesome.db` is the name of the database to backup. Note: the database name is case sensitive.
