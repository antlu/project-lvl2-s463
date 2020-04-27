import fs from 'fs';
import path from 'path';

import compareTwoFiles from '../src';

let fixturesPath;

beforeAll(() => {
  fixturesPath = path.join(__dirname, '__fixtures__');
});

test('A diff for JSON files is created', () => {
  const beforeFilePath = path.join(fixturesPath, 'before.json');
  const afterFilePath = path.join(fixturesPath, 'after.json');
  const diffFilePath = path.join(fixturesPath, 'diff');
  expect(compareTwoFiles(beforeFilePath, afterFilePath))
    .toBe(fs.readFileSync(diffFilePath, 'utf-8').trimEnd());
});
