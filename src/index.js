import fs from 'fs';
import path from 'path';

import program from 'commander';
import yaml from 'js-yaml';
import ini from 'ini';

import { version } from '../package.json';
import makeAST from './parsing';
import renderAST from './formatters';

const fileTypes = {
  '.json': 'JSON',
  '.yaml': 'YAML',
  '.yml': 'YAML',
  '.ini': 'INI',
};

function getFilesType(pathToFile1, pathToFile2) {
  const file1Type = fileTypes[path.extname(pathToFile1)];
  const file2Type = fileTypes[path.extname(pathToFile2)];
  if (file1Type !== file2Type) throw new Error('The files have different types.');
  return file1Type;
}

function getParser(filesType) {
  const parsers = {
    JSON: JSON.parse,
    YAML: yaml.safeLoad,
    INI: ini.parse,
  };
  return parsers[filesType];
}

function getFilesContents(pathToFile1, pathToFile2) {
  const filesType = getFilesType(pathToFile1, pathToFile2);
  const parser = getParser(filesType);
  const contentsBefore = parser(fs.readFileSync(pathToFile1, 'utf-8'));
  const contentsAfter = parser(fs.readFileSync(pathToFile2, 'utf-8'));
  return [contentsBefore, contentsAfter];
}

function compareTwoFiles(pathToFile1, pathToFile2) {
  const [contentsBefore, contentsAfter] = getFilesContents(pathToFile1, pathToFile2);
  const AST = makeAST(contentsBefore, contentsAfter);
  return renderAST(AST, program.format);
}

function showDifference(pathToFile1, pathToFile2) {
  const diff = compareTwoFiles(pathToFile1, pathToFile2);
  console.log(diff);
}

program
  .description('Compares two configuration files and shows the difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'set output format', 'tree')
  .version(version)
  .action(showDifference);

export { compareTwoFiles };
export default program;
