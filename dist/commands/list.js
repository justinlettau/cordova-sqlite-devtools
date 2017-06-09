"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child = require("child_process");
var utility_1 = require("../common/utility");
/**
 * List all databases on the device.
 */
function list() {
    utility_1.getPackageId()
        .then(function (id) { return getDatabases(id); })
        .then(function (files) { return console.log(files); })
        .catch(function (error) { return console.error(error); });
}
exports.list = list;
/**
 * Get a list of all database files from the connected device.
 *
 * @param packageId Application package id.
 */
function getDatabases(packageId) {
    var cmd = "adb shell \"run-as " + packageId + " ls databases\"";
    return new Promise(function (resolve, reject) {
        child.exec(cmd, function (error, stdout, stderr) {
            if (error) {
                return reject(error);
            }
            return resolve(stdout);
        });
    });
}
exports.getDatabases = getDatabases;
//# sourceMappingURL=list.js.map