import _ from 'lodash';

function stringifyValue(value) {
  const valueTypes = {
    object: '[complex value]',
    string: `'${value}'`,
  };
  const valueType = typeof value;
  return valueTypes[valueType] || value;
}

function stringifyNode(node) {
  const nodeTypes = {
    changed: `Property '${node.ancestry}' was changed from ${stringifyValue(node.oldValue)} to ${stringifyValue(node.newValue)}`,
    removed: `Property '${node.ancestry}' was removed`,
    added: `Property '${node.ancestry}' was added with value: ${stringifyValue(node.newValue)}`,
  };
  return nodeTypes[node.type];
}

function renderAST(nodes) {
  function iter(nodes_, ancestry) {
    return nodes_.map((node) => {
      const delimiter = ancestry ? '.' : '';
      const updatedAncestry = `${ancestry}${delimiter}${node.key}`;
      if (_.has(node, 'children')) {
        return iter(node.children, updatedAncestry);
      }
      const nodeWithAncestry = { ...node, ancestry: updatedAncestry };
      return stringifyNode(nodeWithAncestry);
    }).filter(_.identity).join('\n');
  }
  return iter(nodes, '');
}

export default renderAST;
