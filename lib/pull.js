const fs = require('fs-extra');
const xml2js = require('xml2js');
const exec = require('child_process').exec;

module.exports = function (database) {
    var parser = new xml2js.Parser();
    var dir = '_sqlite-backups'
    var dest = 'backup.db';
    var package;
    var cmd;

    if (!database) {
        console.error('Database name not provided!');
        return;
    }

    // make sure backup directory is present
    fs.ensureDir(dir, function (error) {
        if (error) {
            console.log(error);
            return;
        }

        // get package name from config file
        fs.readFile(`./config.xml`, function (error, data) {
            if (error) {
                console.error(error);
                return;
            }

            parser.parseString(data, function (error, result) {
                if (error) {
                    console.error(error);
                    return;
                }

                // ensure package id can be parsed
                if (!result.widget || !result.widget.$ || !result.widget.$.id) {
                    connsole.error('Unable to find package id in config.xml file.');
                    return;
                }

                package = result.widget.$.id;
                cmd = `cd ${dir} && adb -d shell "run-as ${package} cat databases/${database}" > ${dest}`;

                exec(cmd, function (error, stdout, stderr) {
                    if (error) {
                        console.error(error);
                        return;
                    }

                    console.log(`SQLite backup successful!`);
                });
            });
        });
    });
}
