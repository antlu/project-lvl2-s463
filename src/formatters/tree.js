import _ from 'lodash';

const offset = ' '.repeat(4);

function stringifyNode(node, indent) {
  function stringifyValue(nodeValue) {
    if (nodeValue instanceof Object) {
      const stringifiedValue = Object.entries(nodeValue).map(([key, value]) => `${offset}${indent}  ${key}: ${value}`).join('\n');
      return `{\n${stringifiedValue}\n  ${indent}}`;
    }
    return nodeValue;
  }
  const nodeKeyValue = `${node.key}: ${stringifyValue(node.value)}`;
  const nodeTypes = {
    preserved: `  ${nodeKeyValue}`,
    changed: `- ${node.key}: ${stringifyValue(node.oldValue)}\n${indent}+ ${node.key}: ${stringifyValue(node.newValue)}`,
    removed: `- ${nodeKeyValue}`,
    added: `+ ${nodeKeyValue}`,
  };
  return indent + nodeTypes[node.type];
}

function renderChildren(nodes, depth = 0) {
  const indent = `${offset.repeat(depth)}  `;
  return nodes.map((node) => {
    if (_.has(node, 'children')) {
      const children = renderChildren(node.children, depth + 1);
      return `${indent}  ${node.key}: {\n${children}\n  ${indent}}`;
    }
    return stringifyNode(node, indent);
  }).join('\n');
}

function renderAST(node) {
  return `{\n${renderChildren(node)}\n}`;
}

export default renderAST;
