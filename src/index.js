import fs from 'fs';
import path from 'path';

import _ from 'lodash';

import parsers from './parsers';
import makeAST from './ast';
import renderAST from './formatters';

const readFile = (pathToFile) => {
  const fileExtension = path.extname(pathToFile).slice(1);
  const parse = _.get(parsers, fileExtension);
  return parse(fs.readFileSync(pathToFile, 'utf-8'));
};

const compareTwoFiles = (pathToFile1, pathToFile2, outputFormat = 'tree') => {
  const dataBefore = readFile(pathToFile1);
  const dataAfter = readFile(pathToFile2);

  const AST = makeAST(dataBefore, dataAfter);
  return renderAST(AST, outputFormat);
};

export default compareTwoFiles;
