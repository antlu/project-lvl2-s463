import _ from 'lodash';

function makeTreeChildren(contentsBefore, contentsAfter) {
  function makeNode(nodeType) {
    // 0 -- preserved, 1 -- changed, 2 -- removed, 3 -- added
    const nodeTypes = {
      0: key => ({ key, value: contentsBefore[key], type: 'preserved' }),
      1: (key) => {
        const oldValue = contentsBefore[key];
        const newValue = contentsAfter[key];
        const type = 'changed';
        if (oldValue instanceof Object && newValue instanceof Object) {
          return {
            key,
            type: 'preserved',
            children: makeTreeChildren(oldValue, newValue),
          };
        }
        return {
          key, newValue, oldValue, type,
        };
      },
      2: key => ({ key, value: contentsBefore[key], type: 'removed' }),
      3: key => ({ key, value: contentsAfter[key], type: 'added' }),
    };
    return nodeTypes[nodeType];
  }

  const keysBefore = Object.keys(contentsBefore);
  const commonKeys = keysBefore.filter(key => _.has(contentsAfter, key));
  const preservedKeys = commonKeys.filter(
    key => _.isEqual(contentsBefore[key], contentsAfter[key]),
  );
  const changedKeys = commonKeys.filter(
    key => !_.isEqual(contentsBefore[key], contentsAfter[key]),
  );
  const removedKeys = keysBefore.filter(key => !_.has(contentsAfter, key));
  const addedKeys = Object.keys(contentsAfter).filter(key => !_.has(contentsBefore, key));

  const groupedKeys = [preservedKeys, changedKeys, removedKeys, addedKeys];

  return groupedKeys.reduce((acc, keys, nodeType) => {
    const nodes = keys.map(makeNode(nodeType));
    return [...acc, ...nodes];
  }, []);
}

export default makeTreeChildren;
