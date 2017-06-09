"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child = require("child_process");
var chalk = require("chalk");
var fs = require("fs-extra");
var inquirer = require("inquirer");
var list_1 = require("./list");
var utility_1 = require("../common/utility");
/**
 * Pull a database file from the device to the backup directory.
 *
 * @param db Name of database file to pull.
 */
function pull(db) {
    var packageId;
    utility_1.getPackageId()
        .then(function (id) {
        packageId = id;
        return db || prompt(id);
    })
        .then(function (database) {
        var cmd = [
            "adb shell \"run-as " + packageId + " chmod 666 /data/data/" + packageId + "/databases/" + database + "\"",
            "adb exec-out run-as " + packageId + " cat databases/" + database + " > " + utility_1.backupDir + "/" + database
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
/**
 * Prompt user to select from found databases.
 *
 * @param packageId Application package id.
 */
function prompt(packageId) {
    return list_1.getDatabases(packageId)
        .then(function (databases) {
        var choices = databases.split('\n').map(function (item) { return item.trim(); }).filter(function (item) { return !!item; });
        return inquirer.prompt([{
                name: 'db',
                message: 'What database?',
                type: 'list',
                choices: choices
            }]).then(function (answers) {
            return answers.db;
        });
    });
}
//# sourceMappingURL=pull.js.map