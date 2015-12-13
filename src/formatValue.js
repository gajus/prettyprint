import _ from 'lodash';
import formatArray from './formatArray';
import formatObject from './formatObject';
import getFunctionSignature from './getFunctionSignature';
import getValueType from './getValueType';

let formatValue;

formatValue = (
        value,
        blockIndent: string = '',
        indentTemplate: string = '    ',
        visited: Array<Object> = [],
        valueIndex: Object
    ): string => {
    let append,
        type;

    type = getValueType(value);

    if (_.indexOf(visited, value) !== -1) {
        throw new Error('Circular references are not supported.');
    }

    switch (type) {
        case 'array':
            visited.push(value);

            append = formatArray(value, blockIndent, indentTemplate, visited, formatValue, valueIndex);
            break;

        case 'boolean':
            append = value ? 'true' : 'false';
            break;

        case 'number':
            append = String(value);
            break;

        case 'object':
            visited.push(value);

            append = formatObject(value, blockIndent, indentTemplate, visited, formatValue, valueIndex);
            break;

        case 'string':
            append = JSON.stringify(value);
            break;

        case 'function':
            append = getFunctionSignature(value);
            break;

        case 'undefined':
            append = 'undefined';
            break;

        case 'null':
            append = 'null';
            break;

        case 'nan':
            append = 'NaN';
            break;

        default:
            throw new Error('Unknown value type.');
            break;
    }

    if (valueIndex) {
        switch (type) {
            case 'array':
            case 'object':
                valueIndex.add({
                    type,
                    value
                });
                break;

            case 'boolean':
            case 'number':
            case 'string':
            case 'function':
            case 'undefined':
            case 'null':
            case 'nan':
                valueIndex.increment()
                valueIndex.add({
                    type,
                    value
                });
                break;
        }
    }

    return append;
};

export default formatValue;
