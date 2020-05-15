import fs from 'fs';
import path from 'path';

import getParseFunction from './parsers';
import makeAST from './ast';
import renderAST from './formatters';

const getdataType = (pathToFile) => {
  const dataTypes = {
    json: 'json',
    yaml: 'yaml',
    yml: 'yaml',
    ini: 'ini',
  };
  const fileExtension = path.extname(pathToFile).slice(1);
  return dataTypes[fileExtension];
};

const getFileReadingFunction = (dataType) => {
  const parse = getParseFunction(dataType);
  return pathToFile => parse(fs.readFileSync(pathToFile, 'utf-8'));
};

const compareTwoFiles = (pathToFile1, pathToFile2, outputFormat = 'tree') => {
  const file1DataType = getdataType(pathToFile1);
  const file2DataType = getdataType(pathToFile2);
  const readFile1 = getFileReadingFunction(file1DataType);
  const readFile2 = getFileReadingFunction(file2DataType);
  const dataBefore = readFile1(pathToFile1);
  const dataAfter = readFile2(pathToFile2);

  const AST = makeAST(dataBefore, dataAfter);
  return renderAST(AST, outputFormat);
};

export default compareTwoFiles;
