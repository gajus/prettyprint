import formatValue from './formatValue';
import createValueIndex from './createValueIndex';

export {
    createValueIndex
};

/**
 * @typedef {Object} optionsType
 * @property {string} indentTemplate String used to indent one level of code (default: '    ').
 * @property {valueIndex|null} valueIndex A function used to index values in the object, the line of declaration in the output and the internal type of the value.
 */

/**
 * @param {Object} subject
 * @param {optionsType} options
 * @returns {string}
 */
export default (subject: Object, options: Object = {}): string => {
    options.indentationTemplate = options.indentationTemplate || '    ';
    options.valueIndex = options.valueIndex || null;

    return formatValue(subject, '', options.indentationTemplate, [], options.valueIndex) + '\n';
};
