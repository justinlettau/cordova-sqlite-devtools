"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child = require("child_process");
var utility_1 = require("../common/utility");
/**
 * List all databases on the device.
 */
function list() {
    utility_1.getPackageId().then(function (id) {
        var cmd = "adb shell \"run-as " + id + " ls databases\"";
        child.exec(cmd, function (error, stdout, stderr) {
            if (error) {
                console.error(error);
                return;
            }
            console.log(stdout);
        });
    });
}
exports.list = list;
//# sourceMappingURL=list.js.map