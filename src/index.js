import compareTwoFiles from './parsing';

function showDifference(pathToFile1, pathToFile2) {
  const diff = compareTwoFiles(pathToFile1, pathToFile2);
  console.log(diff);
}

export default showDifference;
