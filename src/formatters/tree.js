import _ from 'lodash';

const offset = ' '.repeat(4);

const stringifyValue = (nodeValue, indent) => {
  if (!_.isObject(nodeValue)) return nodeValue;
  const stringifiedValue = Object.entries(nodeValue).map(([key, value]) => (
    `${offset}${indent}  ${key}: ${value}`
  )).join('\n');
  return `{\n${stringifiedValue}\n  ${indent}}`;
};

const renderChildren = (nodes, depth = 0) => {
  const indent = `${offset.repeat(depth)}  `;
  return nodes.map((node) => {
    switch (node.type) {
      case 'subtree':
        return `${indent}  ${node.key}: {\n${renderChildren(node.children, depth + 1)}\n  ${indent}}`;
      case 'preserved':
        return `${indent}  ${node.key}: ${stringifyValue(node.oldValue, indent)}`;
      case 'changed':
        return `${indent}- ${node.key}: ${stringifyValue(node.oldValue, indent)}\n${indent}+ ${node.key}: ${stringifyValue(node.newValue, indent)}`;
      case 'removed':
        return `${indent}- ${node.key}: ${stringifyValue(node.oldValue, indent)}`;
      case 'added':
        return `${indent}+ ${node.key}: ${stringifyValue(node.newValue, indent)}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  }).join('\n');
};

const renderAST = nodes => `{\n${renderChildren(nodes)}\n}`;

export default renderAST;
