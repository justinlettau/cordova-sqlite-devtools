import * as child from 'child_process';
import * as chalk from 'chalk';
import * as fs from 'fs-extra';
import * as inquirer from 'inquirer';

import { getDatabases } from './list';
import { backupDir, getPackageId } from '../common/utility';

/**
 * Pull a database file from the device to the backup directory.
 *
 * @param db Name of database file to pull.
 */
export function pull(db?: string): void {
    let packageId: string;

    getPackageId()
        .then((id: string) => {
            packageId = id;
            return db || prompt(id);
        })
        .then((database: string) => {
            const cmd: string = [
                `adb shell "run-as ${packageId} chmod 666 /data/data/${packageId}/databases/${database}"`,
                `adb exec-out run-as ${packageId} cat databases/${database} > ${backupDir}/${database}`
            ].join(' && ');

            // make sure backup directory is present
            fs.ensureDirSync(backupDir);

            child.exec(cmd, (error: Error, stdout: string, stderr: string): void => {
                if (error) {
                    console.error(error);
                    return;
                }

                console.log(chalk.green('SQLite backup successful!'));
            });
        });
}

/**
 * Prompt user to select from found databases.
 *
 * @param packageId Application package id.
 */
function prompt(packageId: string): Promise<string> {
    return getDatabases(packageId)
        .then((databases: string) => {
            const choices: string[] = databases.split('\n').map(item => item.trim()).filter(item => !!item);

            return inquirer.prompt([{
                name: 'db',
                message: 'What database?',
                type: 'list',
                choices
            }]).then((answers: inquirer.Answers): string => {
                return answers.db;
            });
        });
}
