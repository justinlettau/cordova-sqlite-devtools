import * as fs from 'fs-extra';
import * as xml2js from 'xml2js';

/**
 * Database backup directory.
 */
export const backupDir: string = '_sqlite-backups';

/**
 * Get package id from `config.xml` file in current directory.
 */
export function getPackageId(): Promise<string> {
    const parser = new xml2js.Parser();

    return new Promise((resolve, reject) => {
        const config: Buffer = fs.readFileSync('./config.xml');

        parser.parseString(config, (err, result) => {
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
