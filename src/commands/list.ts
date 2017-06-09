import * as child from 'child_process';

import { getPackageId } from '../common/utility';

/**
 * List all databases on the device.
 */
export function list(): void {
    getPackageId()
        .then((id: string) => getDatabases(id))
        .then((files: string) => console.log(files))
        .catch((error: any) => console.error(error));
}

/**
 * Get a list of all database files from the connected device.
 *
 * @param packageId Application package id.
 */
export function getDatabases(packageId: string): Promise<string> {
    const cmd: string = `adb shell "run-as ${packageId} ls databases"`;

    return new Promise((resolve, reject): void => {
        child.exec(cmd, (error: Error, stdout: string, stderr: string): void => {
            if (error) {
                return reject(error);
            }

            return resolve(stdout);
        });
    });
}
