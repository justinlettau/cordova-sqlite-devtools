const fs = require('fs-extra');
const exec = require('child_process').exec;
const util = require('./utility');

module.exports = function (database) {
    if (!database) {
        console.error('Database name not provided!');
        return;
    }

    // get package from config file
    util.getPackageId().then(function (id) {
        var cmd;

        // make sure backup directory is present
        fs.ensureDirSync(util.backupDir);

        cmd = `cd ${util.backupDir} && adb -d shell "run-as ${id} cat databases/${database}" > ${database}`;

        exec(cmd, function (error, stdout, stderr) {
            if (error) {
                console.error(error);
                return;
            }

            console.log(`SQLite backup successful!`);
        });
    });
}
