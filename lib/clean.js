const del = require('del');
const util = require('./utility');

module.exports = function () {
    del(util.backupDir).then(() => {
        console.log('Backups successfully removed!');
    });
}
