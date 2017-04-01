const fs = require('fs-extra');
const xml2js = require('xml2js');

module.exports = {

    /**
     * Database backup directory.
     */
    backupDir: '_sqlite-backups',

    /**
     * Get package id from `config.xml` file in current directory.
     */
    getPackageId: function () {
        var parser = new xml2js.Parser();

        return new Promise((resolve, reject) => {
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
        }).catch(err => console.error(err));
    }

};
