import fs from 'fs';
import path from 'path';

import { compareTwoFiles } from '../src';

let fixturesPath;

beforeAll(() => {
  fixturesPath = path.join(__dirname, '__fixtures__');
});

test.each([
  ['.json', 'tree'],
  ['.yml', 'tree'],
  ['.ini', 'tree'],
  ['.json', 'text'],
  ['.yml', 'text'],
  ['.ini', 'text'],
])('A diff for %s files is correct [%s format]', (extension, format) => {
  const beforeFilePath = path.join(fixturesPath, `before${extension}`);
  const afterFilePath = path.join(fixturesPath, `after${extension}`);
  const diffFilePath = path.join(fixturesPath, `diff.${format}`);
  const diffFileData = fs.readFileSync(diffFilePath, 'utf-8').trimEnd();

  expect(compareTwoFiles(beforeFilePath, afterFilePath, format))
    .toBe(diffFileData);
});
