import * as program from 'commander';

import pkg = require('../package.json');
import { clean } from './commands/clean';
import { generate } from './commands/generate';
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
  .command('generate')
  .alias('g')
  .description('Generate sqlite build file.')
  .option('-s, --src [value]', 'Source glob of sql files.')
  .option('-d, --dest [value]', 'Destination output file.')
  .action(generate);

program
  .version((pkg as any).version)
  .parse(process.argv);
