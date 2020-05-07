import _ from 'lodash';

function makeTreeChildren(dataBefore, dataAfter) {
  const allKeys = _.union(Object.keys(dataBefore), Object.keys(dataAfter));
  return allKeys.map((key) => {
    if (_.has(dataBefore, key) && _.has(dataAfter, key)) {
      if (_.isEqual(dataBefore[key], dataAfter[key])) {
        return {
          key, type: 'preserved', oldValue: dataBefore[key], newValue: dataAfter[key],
        };
      }
      const object = {
        key, type: 'changed', oldValue: dataBefore[key], newValue: dataAfter[key],
      };
      if (_.isObject(object.oldValue) && _.isObject(object.newValue)) {
        return { ...object, children: makeTreeChildren(object.oldValue, object.newValue) };
      }
      return object;
    }
    if (_.has(dataBefore, key)) {
      return {
        key, type: 'removed', oldValue: dataBefore[key], newValue: null,
      };
    }
    return {
      key, type: 'added', oldValue: null, newValue: dataAfter[key],
    };
  });
}

export default makeTreeChildren;
