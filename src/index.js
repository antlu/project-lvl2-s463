import program from 'commander';

import { version } from '../package.json';

program
  .description('Compares two configuration files and shows the difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'set output format')
  .version(version)
  .action();

export default program;
