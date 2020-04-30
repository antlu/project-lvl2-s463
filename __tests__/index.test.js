import fs from 'fs';
import path from 'path';

import { compareTwoFiles } from '../src';

let fixturesPath;

beforeAll(() => {
  fixturesPath = path.join(__dirname, '__fixtures__');
});

test.each([
  ['plain', '.json'],
  ['plain', '.yml'],
  ['plain', '.ini'],
  ['nested', '.json'],
  ['nested', '.yml'],
  ['nested', '.ini'],
])('A diff for %s %s files is correct', (kind, extension) => {
  const beforeFilePath = path.join(fixturesPath, kind, `before${extension}`);
  const afterFilePath = path.join(fixturesPath, kind, `after${extension}`);
  const diffFilePath = path.join(fixturesPath, kind, 'diff');
  const diffFileContents = fs.readFileSync(diffFilePath, 'utf-8').trimEnd();

  expect(compareTwoFiles(beforeFilePath, afterFilePath))
    .toBe(diffFileContents);
});
