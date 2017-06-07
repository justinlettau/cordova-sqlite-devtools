"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pkg = require('../package.json');
var program = require("commander");
var clean_1 = require("./commands/clean");
var list_1 = require("./commands/list");
var pull_1 = require("./commands/pull");
program
    .command('list')
    .alias('ls')
    .description('List all database files.')
    .action(list_1.list);
program
    .command('pull [database]')
    .alias('p')
    .description('Pull database from device.')
    .action(pull_1.pull);
program
    .command('clean')
    .alias('c')
    .description('Remove all backup sqlite files.')
    .action(clean_1.clean);
program
    .version(pkg.version)
    .parse(process.argv);
//# sourceMappingURL=index.js.map