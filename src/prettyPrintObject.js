import _ from 'lodash';
import formatValue from './formatValue';

/**
 * @typedef {Function} postFormatValueCallback
 * @param {string} value Formatted value.
 * @returns {string}
 */

/**
 * @typedef {Object} optionsType
 * @property {string} indentTemplate String used to indent one level of code (default: '    ').
 * @property {postFormatValueCallback} postFormatValueCallback Function used to annotate a value.
 */

/**
 * @param {Object} subject
 * @param {optionsType} options
 * @returns {string}
 */
export default (subject: Object, options: Object = {}): string => {
    if (!_.has(options, 'indentationTemplate')) {
        options.indentationTemplate = '    ';
    }

    if (!_.has(options, 'postFormatValueCallback')) {
        options.postFormatValueCallback = (value) => {
            return value;
        };
    }

    return formatValue(subject, '', options.indentationTemplate, [], options.postFormatValueCallback) + '\n';
};
