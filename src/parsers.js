import yaml from 'js-yaml';
import ini from 'ini';

const getParseFunction = (dataType) => {
  const functions = {
    json: JSON.parse,
    yaml: yaml.safeLoad,
    ini: ini.parse,
  };
  return functions[dataType];
};

export default getParseFunction;
