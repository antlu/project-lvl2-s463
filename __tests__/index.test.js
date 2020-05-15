import fs from 'fs';
import path from 'path';

import compareTwoFiles from '../src';

const getFilePath = filename => path.join(__dirname, '__fixtures__', filename);

test.each([
  ['.json', 'tree'],
  ['.yml', 'tree'],
  ['.ini', 'tree'],
  ['.json', 'text'],
  ['.yml', 'text'],
  ['.ini', 'text'],
])('A diff for %s files is correct [%s format]', (extension, format) => {
  const beforeFilePath = getFilePath(`before${extension}`);
  const afterFilePath = getFilePath(`after${extension}`);
  const diffFilePath = getFilePath(`diff.${format}`);
  const diffFileData = fs.readFileSync(diffFilePath, 'utf-8').trimEnd();

  expect(compareTwoFiles(beforeFilePath, afterFilePath, format))
    .toBe(diffFileData);
});
