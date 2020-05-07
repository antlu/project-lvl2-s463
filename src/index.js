import fs from 'fs';
import path from 'path';

import getParseFunction from './parsers';
import makeAST from './ast';
import renderAST from './formatters';

function getFileType(pathToFile) {
  const fileTypes = {
    '.json': 'JSON',
    '.yaml': 'YAML',
    '.yml': 'YAML',
    '.ini': 'INI',
  };
  const fileExtension = path.extname(pathToFile);
  return fileTypes[fileExtension];
}

function getFileReadingFunction(fileType) {
  const parse = getParseFunction(fileType);
  return pathToFile => parse(fs.readFileSync(pathToFile, 'utf-8'));
}

function compareTwoFiles(pathToFile1, pathToFile2, outputFormat = 'tree') {
  const file1Type = getFileType(pathToFile1);
  const file2Type = getFileType(pathToFile2);
  if (file1Type !== file2Type) throw new Error('The files have different types.');

  const readFile = getFileReadingFunction(file1Type);
  const dataBefore = readFile(pathToFile1);
  const dataAfter = readFile(pathToFile2);

  const AST = makeAST(dataBefore, dataAfter);
  return renderAST(AST, outputFormat);
}

function showDifference(pathToFile1, pathToFile2, outputFormat) {
  const diff = compareTwoFiles(pathToFile1, pathToFile2, outputFormat);
  console.log(diff);
}

export { compareTwoFiles };
export default showDifference;
