import _ from 'lodash';

const makeTreeChildren = (dataBefore, dataAfter) => {
  const allKeys = _.union(Object.keys(dataBefore), Object.keys(dataAfter));
  return allKeys.map((key) => {
    if (_.has(dataBefore, key) && !_.has(dataAfter, key)) {
      return {
        key, type: 'removed', oldValue: dataBefore[key], newValue: null, children: [],
      };
    }
    if (!_.has(dataBefore, key) && _.has(dataAfter, key)) {
      return {
        key, type: 'added', oldValue: null, newValue: dataAfter[key], children: [],
      };
    }
    if (_.isEqual(dataBefore[key], dataAfter[key])) {
      return {
        key, type: 'preserved', oldValue: dataBefore[key], newValue: dataAfter[key], children: [],
      };
    }
    const object = {
      key, type: 'changed', oldValue: dataBefore[key], newValue: dataAfter[key], children: [],
    };
    if (_.isObject(object.oldValue) && _.isObject(object.newValue)) {
      return { ...object, children: makeTreeChildren(object.oldValue, object.newValue) };
    }
    return object;
  });
};

export default makeTreeChildren;
