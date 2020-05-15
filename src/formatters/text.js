import _ from 'lodash';

const stringifyValue = (value) => {
  const valueTypes = {
    object: '[complex value]',
    string: `'${value}'`,
  };
  const valueType = typeof value;
  return valueTypes[valueType] || value;
};

const stringifyNode = (node, ancestry) => {
  const nodeTypes = {
    changed: `Property '${ancestry}' was changed from ${stringifyValue(node.oldValue)} to ${stringifyValue(node.newValue)}`,
    removed: `Property '${ancestry}' was removed`,
    added: `Property '${ancestry}' was added with value: ${stringifyValue(node.newValue)}`,
  };
  return nodeTypes[node.type];
};

const renderAST = (nodes) => {
  const iter = (nodes_, ancestry) => nodes_.map((node) => {
    const delimiter = ancestry ? '.' : '';
    const updatedAncestry = `${ancestry}${delimiter}${node.key}`;
    if (node.children.length > 0) {
      return iter(node.children, updatedAncestry);
    }
    return stringifyNode(node, updatedAncestry);
  }).filter(_.identity).join('\n');
  return iter(nodes, '');
};

export default renderAST;
