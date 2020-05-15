import _ from 'lodash';

const offset = ' '.repeat(4);

const stringifyNode = (node, indent) => {
  const stringifyValue = (nodeValue) => {
    if (!_.isObject(nodeValue)) return nodeValue;
    const stringifiedValue = Object.entries(nodeValue).map(([key, value]) => (
      `${offset}${indent}  ${key}: ${value}`
    )).join('\n');
    return `{\n${stringifiedValue}\n  ${indent}}`;
  };
  const nodeTypes = {
    preserved: `  ${node.key}: ${stringifyValue(node.oldValue)}`,
    changed: `- ${node.key}: ${stringifyValue(node.oldValue)}\n${indent}+ ${node.key}: ${stringifyValue(node.newValue)}`,
    removed: `- ${node.key}: ${stringifyValue(node.oldValue)}`,
    added: `+ ${node.key}: ${stringifyValue(node.newValue)}`,
  };
  return `${indent}${nodeTypes[node.type]}`;
};

const renderChildren = (nodes, depth = 0) => {
  const indent = `${offset.repeat(depth)}  `;
  return nodes.map((node) => {
    if (node.children.length > 0) {
      const children = renderChildren(node.children, depth + 1);
      return `${indent}  ${node.key}: {\n${children}\n  ${indent}}`;
    }
    return stringifyNode(node, indent);
  }).join('\n');
};

const renderAST = nodes => `{\n${renderChildren(nodes)}\n}`;

export default renderAST;
