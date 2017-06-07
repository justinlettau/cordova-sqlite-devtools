import * as child from 'child_process';
import * as chalk from 'chalk';
import * as fs from 'fs-extra';

import { getPackageId, backupDir } from '../common/utility';

/**
 * Pull a database file from the device to the backup directory.
 *
 * @param database Name of database file to pull.
 */
export function pull(database: string): void {
    if (!database) {
        console.error('Database name not provided!');
        return;
    }

    // get package from config file
    getPackageId().then((id: string): void => {
        let cmd: string = [
            `adb shell "run-as ${id} chmod 666 /data/data/${id}/databases/${database}"`,
            `adb exec-out run-as ${id} cat databases/${database} > ${backupDir}/${database}`
        ].join(' && ');

        // make sure backup directory is present
        fs.ensureDirSync(backupDir);

        child.exec(cmd, (error, stdout, stderr): void => {
            if (error) {
                console.error(error);
                return;
            }

            console.log(chalk.green('SQLite backup successful!'));
        });
    });
}
