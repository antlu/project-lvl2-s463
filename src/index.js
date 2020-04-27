import fs from 'fs';

import _ from 'lodash';

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

function compareTwoFiles(pathToFile1, pathToFile2) {
  const contentsBefore = JSON.parse(fs.readFileSync(pathToFile1));
  const contentsAfter = JSON.parse(fs.readFileSync(pathToFile2));

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
  const diff = `{\n${allLinesAsStr}\n}`;

  return diff;
}

function showDifference(pathToFile1, pathToFile2) {
  const diff = compareTwoFiles(pathToFile1, pathToFile2);
  console.log(diff);
}

export { showDifference };
export default compareTwoFiles;
