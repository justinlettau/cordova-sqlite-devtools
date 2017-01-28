const exec = require('child_process').exec;
const util = require('./utility');

module.exports = function () {

    // get package from config file
    util.getPackageId().then(function (id) {
        var cmd = `adb shell "run-as ${id} ls databases"`;

        exec(cmd, function (error, stdout, stderr) {
            if (error) {
                console.error(error);
                return;
            }

            console.log(stdout);
        });
    });
}
