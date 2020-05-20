import _ from 'lodash';

const makeTreeChildren = (dataBefore, dataAfter) => {
  const allKeys = _.union(Object.keys(dataBefore), Object.keys(dataAfter));
  return allKeys.map((key) => {
    const node = {
      key, type: '', oldValue: dataBefore[key], newValue: dataAfter[key],
    };
    if (!_.has(dataAfter, key)) {
      return { ...node, type: 'removed', newValue: null };
    }
    if (!_.has(dataBefore, key)) {
      return { ...node, type: 'added', oldValue: null };
    }
    if (_.isObject(node.oldValue) && _.isObject(node.newValue)) {
      return { ...node, type: 'subtree', children: makeTreeChildren(node.oldValue, node.newValue) };
    }
    if (_.isEqual(node.oldValue, node.newValue)) {
      return { ...node, type: 'preserved' };
    }
    return { ...node, type: 'changed' };
  });
};

export default makeTreeChildren;
