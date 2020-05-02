import fs from 'fs';
import path from 'path';

import { compareTwoFiles } from '../src';

let fixturesPath;

beforeAll(() => {
  fixturesPath = path.join(__dirname, '__fixtures__');
});

test.each([
  ['plain', '.json', 'tree'],
  ['plain', '.yml', 'tree'],
  ['plain', '.ini', 'tree'],
  ['nested', '.json', 'tree'],
  ['nested', '.yml', 'tree'],
  ['nested', '.ini', 'tree'],
  ['plain', '.json', 'text'],
  ['plain', '.yml', 'text'],
  ['plain', '.ini', 'text'],
  ['nested', '.json', 'text'],
  ['nested', '.yml', 'text'],
  ['nested', '.ini', 'text'],
])('A diff for %s %s files is correct [%s format]', (kind, extension, format) => {
  const beforeFilePath = path.join(fixturesPath, kind, `before${extension}`);
  const afterFilePath = path.join(fixturesPath, kind, `after${extension}`);
  const diffFilePath = path.join(fixturesPath, kind, `diff.${format}`);
  const diffFileContents = fs.readFileSync(diffFilePath, 'utf-8').trimEnd();

  expect(compareTwoFiles(beforeFilePath, afterFilePath, format))
    .toBe(diffFileContents);
});
