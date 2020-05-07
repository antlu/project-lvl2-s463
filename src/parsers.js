import yaml from 'js-yaml';
import ini from 'ini';

function getParseFunction(fileType) {
  const functions = {
    JSON: JSON.parse,
    YAML: yaml.safeLoad,
    INI: ini.parse,
  };
  return functions[fileType];
}

export default getParseFunction;
