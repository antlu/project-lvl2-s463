import fs from 'fs';
import path from 'path';

import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

function keyValueToStr([key, value]) {
  return `${key}: ${value}`;
}

function prepareForOutput(lines, lineType) {
  const indent = '  ';
  // 0 -- preserved, 1 -- changed, 2 -- removed, 3 -- added
  const lineTypes = {
    0: str => `${indent}  ${str}`,
    1: ([oldLine, newLine]) => `${indent}- ${oldLine}\n${indent}+ ${newLine}`,
    2: str => `${indent}- ${str}`,
    3: str => `${indent}+ ${str}`,
  };
  return lines.map(lineTypes[lineType]).join('\n');
}

function getFilesType(pathToFile1, pathToFile2) {
  const fileTypes = {
    '.json': 'JSON',
    '.yaml': 'YAML',
    '.yml': 'YAML',
    '.ini': 'INI',
  };

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

function compareTwoFiles(pathToFile1, pathToFile2) {
  const filesType = getFilesType(pathToFile1, pathToFile2);
  const parser = getParser(filesType);
  const contentsBefore = parser(fs.readFileSync(pathToFile1, 'utf-8'));
  const contentsAfter = parser(fs.readFileSync(pathToFile2, 'utf-8'));

  const entriesBefore = Object.entries(contentsBefore);
  const commonLines = entriesBefore.filter(([key]) => _.has(contentsAfter, key));
  const preservedLines = commonLines
    .filter(([key]) => contentsBefore[key] === contentsAfter[key])
    .map(keyValueToStr);
  const changedLines = commonLines
    .filter(([key]) => contentsBefore[key] !== contentsAfter[key])
    .map(([key, value]) => [keyValueToStr([key, value]), keyValueToStr([key, contentsAfter[key]])]);
  const removedLines = entriesBefore
    .filter(([key]) => !_.has(contentsAfter, key))
    .map(keyValueToStr);
  const addedLines = Object.entries(contentsAfter)
    .filter(([key]) => !_.has(contentsBefore, key))
    .map(keyValueToStr);

  const allLines = [preservedLines, changedLines, removedLines, addedLines];
  const allLinesAsStr = allLines.reduce((acc, lines, i) => (
    lines.length > 0 ? [...acc, prepareForOutput(lines, i)] : acc
  ), []).join('\n');
  return `{\n${allLinesAsStr}\n}`;
}

export default compareTwoFiles;
