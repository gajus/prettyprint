import getFunctionParameterNames from 'get-parameter-names';
import isArrowFunction from 'is-arrow-function';

export default (fn: Object): string => {
    let name,
        parameterNames;

    name = fn.name ? fn.name + ' ' : '';

    parameterNames = getFunctionParameterNames(fn);

    if (isArrowFunction(fn)) {
        return '(' + parameterNames.join(', ') + ') => { ... }';
    } else {
        return 'function ' + name + '(' + parameterNames.join(', ') + ') { ... }';
    }
};
