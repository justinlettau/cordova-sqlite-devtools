const fs = require('fs-extra');
const xml2js = require('xml2js');
const exec = require('child_process').exec;

module.exports = function () {
    var parser = new xml2js.Parser();
    var cmd;

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
            cmd = `adb shell "run-as ${package} ls databases"`;

            exec(cmd, function (error, stdout, stderr) {
                if (error) {
                    console.error(error);
                    return;
                }

                console.log(stdout);
            });
        });
    });
}
