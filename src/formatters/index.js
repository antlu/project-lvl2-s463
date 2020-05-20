import renderAsTree from './tree';
import renderAsText from './text';
import renderAsJSON from './json';

const renderAST = (AST, format) => {
  const formatters = {
    tree: renderAsTree,
    text: renderAsText,
    json: renderAsJSON,
  };
  const render = formatters[format];
  if (!render) throw new Error(`Unsupported output format: ${format}`);
  return render(AST);
};

export default renderAST;
