"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child = require("child_process");
var chalk = require("chalk");
var fs = require("fs-extra");
var utility_1 = require("../common/utility");
/**
 * Pull a database file from the device to the backup directory.
 *
 * @param database Name of database file to pull.
 */
function pull(database) {
    if (!database) {
        console.error('Database name not provided!');
        return;
    }
    // get package from config file
    utility_1.getPackageId().then(function (id) {
        var cmd = [
            "adb shell \"run-as " + id + " chmod 666 /data/data/" + id + "/databases/" + database + "\"",
            "adb exec-out run-as " + id + " cat databases/" + database + " > " + utility_1.backupDir + "/" + database
        ].join(' && ');
        // make sure backup directory is present
        fs.ensureDirSync(utility_1.backupDir);
        child.exec(cmd, function (error, stdout, stderr) {
            if (error) {
                console.error(error);
                return;
            }
            console.log(chalk.green('SQLite backup successful!'));
        });
    });
}
exports.pull = pull;
//# sourceMappingURL=pull.js.map