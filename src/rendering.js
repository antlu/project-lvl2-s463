import _ from 'lodash';

const offset = ' '.repeat(4);

function nodeToString(node, indent) {
  function stringify(nodeValue) {
    if (nodeValue instanceof Object) {
      const strValue = Object.entries(nodeValue).map(([key, value]) => `${key}: ${value}`).join('\n');
      return `{\n${offset}${indent}  ${strValue}\n  ${indent}}`;
    }
    return nodeValue;
  }
  const nodeKeyValue = `${node.key}: ${stringify(node.value)}`;
  const nodeTypes = {
    preserved: `  ${nodeKeyValue}`,
    changed: `- ${node.key}: ${stringify(node.oldValue)}\n${indent}+ ${node.key}: ${stringify(node.value)}`,
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
    return nodeToString(node, indent);
  }).join('\n');
}

function renderAST(node) {
  return `{\n${renderChildren(node)}\n}`;
}

export default renderAST;
