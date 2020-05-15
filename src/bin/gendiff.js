#!/usr/bin/env node

import program from 'commander';

import { version } from '../../package.json';
import compareTwoFiles from '..';

program
  .description('Compares two configuration files and shows the difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'set output format')
  .version(version)
  .action((config1Path, config2Path, { format }) => {
    const diff = compareTwoFiles(config1Path, config2Path, format);
    console.log(diff);
  });

program.parse(process.argv);
