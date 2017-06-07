const fs = require('fs-extra');
const exec = require('child_process').exec;
const util = require('./utility');

module.exports = (database) => {
    if (!database) {
        console.error('Database name not provided!');
        return;
    }

    // get package from config file
    util.getPackageId().then((id) => {
        let cmd = [
            `adb shell "run-as ${id} chmod 666 /data/data/${id}/databases/${database}"`,
            `adb exec-out run-as ${id} cat databases/${database} > ${util.backupDir}/${database}`
        ].join(' && ');

        // make sure backup directory is present
        fs.ensureDirSync(util.backupDir);

        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(error);
                return;
            }

            console.log(`SQLite backup successful!`);
        });
    });
};
