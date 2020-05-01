import _ from 'lodash';

function stringifyValue(value) {
  return value instanceof Object ? '[complex value]' : value;
}

function stringifyNode(node) {
  const nodeTypes = {
    changed: `Property '${node.ancestry}' was changed from '${stringifyValue(node.oldValue)}' to '${stringifyValue(node.value)}'`,
    removed: `Property '${node.ancestry}' was removed`,
    added: `Property '${node.ancestry}' was added with value: '${stringifyValue(node.value)}'`,
  };
  return nodeTypes[node.type] || '';
}

function renderAST(nodes) {
  function iter(nodes_, ancestry) {
    return nodes_.map((node) => {
      const delimiter = ancestry ? '.' : '';
      const updAncestry = `${ancestry}${delimiter}${node.key}`;
      if (_.has(node, 'children')) {
        return iter(node.children, updAncestry);
      }
      const nodeWithAncestry = { ...node, ancestry: updAncestry };
      return stringifyNode(nodeWithAncestry);
    }).join('\n').trimStart();
  }
  return iter(nodes, '');
}

export default renderAST;
