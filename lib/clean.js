const del = require('del');

module.exports = function () {
    var dir = '_sqlite-backups';

    del(dir).then(() => {
        console.log('Backups successfully removed!');
    });
}
