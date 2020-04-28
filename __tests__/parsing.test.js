import fs from 'fs';
import path from 'path';

import compareTwoFiles from '../src/parsing';

let fixturesPath;
let diffFileContents;

beforeAll(() => {
  fixturesPath = path.join(__dirname, '__fixtures__');
  const diffFilePath = path.join(fixturesPath, 'diff');
  diffFileContents = fs.readFileSync(diffFilePath, 'utf-8').trimEnd();
});

test('A diff for JSON files is correct', () => {
  const beforeFilePath = path.join(fixturesPath, 'before.json');
  const afterFilePath = path.join(fixturesPath, 'after.json');
  expect(compareTwoFiles(beforeFilePath, afterFilePath))
    .toBe(diffFileContents);
});

test('A diff for YAML files is correct', () => {
  const beforeFilePath = path.join(fixturesPath, 'before.yml');
  const afterFilePath = path.join(fixturesPath, 'after.yml');
  expect(compareTwoFiles(beforeFilePath, afterFilePath))
    .toBe(diffFileContents);
});
