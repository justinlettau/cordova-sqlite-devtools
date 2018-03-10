import chalk from 'chalk';
import * as del from 'del';

import { backupDir } from '../common/utility';

/**
 * Remove backups folder and all backups.
 */
export function clean(): void {
  del(backupDir).then((): void => {
    console.log(chalk.green('Backups successfully removed!'));
  });
}
