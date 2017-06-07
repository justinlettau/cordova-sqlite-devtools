import * as child from 'child_process';

import { getPackageId } from '../common/utility';

/**
 * List all databases on the device.
 */
export function list(): void {
    getPackageId().then((id: string): void => {
        const cmd: string = `adb shell "run-as ${id} ls databases"`;

        child.exec(cmd, (error, stdout, stderr): void => {
            if (error) {
                console.error(error);
                return;
            }

            console.log(stdout);
        });
    });
}
