import getFunctionParameterNames from 'get-parameter-names';
import isArrowFunction from 'is-arrow-function';

export default (fn: Object, path_name): string => {
  const name = (fn.name ? fn.name : path_name) + ' ';
  const parameterNames = getFunctionParameterNames(fn);

  if (isArrowFunction(fn)) {
    return '(' + parameterNames.join(', ') + ') => { ... }';
  } else {
    return 'function ' + name + '(' + parameterNames.join(', ') + ') { ... }';
  }
};
