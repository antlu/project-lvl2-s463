import _ from 'lodash';

const offset = ' '.repeat(4);

function stringifyNode(node, indent) {
  function stringifyValue(nodeValue) {
    if (nodeValue instanceof Object) {
      const strValue = Object.entries(nodeValue).map(([key, value]) => `${key}: ${value}`).join('\n');
      return `{\n${offset}${indent}  ${strValue}\n  ${indent}}`;
    }
    return nodeValue;
  }
  const nodeKeyValue = `${node.key}: ${stringifyValue(node.value)}`;
  const nodeTypes = {
    preserved: `  ${nodeKeyValue}`,
    changed: `- ${node.key}: ${stringifyValue(node.oldValue)}\n${indent}+ ${node.key}: ${stringifyValue(node.value)}`,
    removed: `- ${nodeKeyValue}`,
    added: `+ ${nodeKeyValue}`,
  };
  return indent + nodeTypes[node.type];
}

function renderChildren(nodes, indent = '  ') {
  return nodes.map((node) => {
    if (_.has(node, 'children')) {
      const children = renderChildren(node.children, indent + offset);
      return `${indent}  ${node.key}: {\n${children}\n  ${indent}}`;
    }
    return stringifyNode(node, indent);
  }).join('\n');
}

function renderAST(node) {
  return `{\n${renderChildren(node)}\n}`;
}

export default renderAST;
