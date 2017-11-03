"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var xml2js = require("xml2js");
/**
 * Database backup directory.
 */
exports.backupDir = '_sqlite-backups';
/**
 * Get package id from `config.xml` file in current directory.
 */
function getPackageId() {
    var parser = new xml2js.Parser();
    return new Promise(function (resolve, reject) {
        var config = fs.readFileSync('./config.xml');
        parser.parseString(config, function (err, result) {
            if (err) {
                return reject(err);
            }
            // ensure package id can be parsed
            if (!result.widget || !result.widget.$ || !result.widget.$.id) {
                return reject(new Error('Unable to find package id in config.xml file.'));
            }
            return resolve(result.widget.$.id);
        });
    });
}
exports.getPackageId = getPackageId;
//# sourceMappingURL=utility.js.map