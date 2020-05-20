import _ from 'lodash';

const stringifyValue = (value) => {
  const valueTypes = {
    object: '[complex value]',
    string: `'${value}'`,
  };
  const valueType = typeof value;
  return valueTypes[valueType] || value;
};

const stringifyNode = (node, ancestry, stringifyChildren) => {
  const nodeTypes = {
    subtree: () => stringifyChildren(node.children, ancestry),
    preserved: () => null,
    changed: () => `Property '${ancestry}' was changed from ${stringifyValue(node.oldValue)} to ${stringifyValue(node.newValue)}`,
    removed: () => `Property '${ancestry}' was removed`,
    added: () => `Property '${ancestry}' was added with value: ${stringifyValue(node.newValue)}`,
  };
  return nodeTypes[node.type]();
};

const renderAST = (nodes) => {
  const iter = (nodes_, ancestry) => nodes_.map((node) => {
    const delimiter = ancestry ? '.' : '';
    const updatedAncestry = `${ancestry}${delimiter}${node.key}`;
    return stringifyNode(node, updatedAncestry, iter);
  }).filter(_.identity).join('\n');
  return iter(nodes, '');
};

export default renderAST;
