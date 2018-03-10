import pkg = require('../package.json');
import * as program from 'commander';

import { clean } from './commands/clean';
import { list } from './commands/list';
import { pull } from './commands/pull';

program
  .command('list')
  .alias('ls')
  .description('List all database files.')
  .action(list);

program
  .command('pull [database]')
  .alias('p')
  .description('Pull database from device.')
  .action(pull);

program
  .command('clean')
  .alias('c')
  .description('Remove all backup sqlite files.')
  .action(clean);

program
  .version((pkg as any).version)
  .parse(process.argv);
