#!/usr/bin/env node

import program from 'commander';

import { version } from '../../package.json';
import showDifference from '..';

program
  .description('Compares two configuration files and shows the difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'set output format')
  .version(version)
  .action((config1Path, config2Path, { format }) => {
    showDifference(config1Path, config2Path, format);
  });

program.parse(process.argv);
