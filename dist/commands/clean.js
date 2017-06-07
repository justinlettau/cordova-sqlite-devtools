"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var del = require("del");
var utility_1 = require("../common/utility");
/**
 * Remove backups folder and all backups.
 */
function clean() {
    del(utility_1.backupDir).then(function () {
        console.log(chalk.green('Backups successfully removed!'));
    });
}
exports.clean = clean;
//# sourceMappingURL=clean.js.map