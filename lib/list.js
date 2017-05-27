const exec = require('child_process').exec;
const util = require('./utility');

module.exports = () => {
    // get package from config file
    util.getPackageId().then((id) => {
        const cmd = `adb shell "run-as ${id} ls databases"`;

        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(error);
                return;
            }

            console.log(stdout);
        });
    });
};
