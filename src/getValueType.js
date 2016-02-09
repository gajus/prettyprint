export default (value): string => {
    if (Array.isArray(value)) {
        return 'array';
    }

    if (typeof value === 'boolean') {
        return 'boolean';
    }

    // _.isDate
    // _.isElement
    // _.isError

    if (typeof value === 'function') {
        return 'function';
    }


    // _.isNative

    if (value === null) {
        return 'null';
    }

    if (typeof value === 'number') {
        return 'number';
    }

    if (value instanceof RegExp) {
        return 'regexp';
    }

    if (typeof value === 'string') {
        return 'string';
    }

    // isTypedArray

    if (value === undefined) {
        return 'undefined';
    }

    if (typeof value === 'number' && isNaN(value)) {
        return 'nan';
    }

    if (typeof value === 'object') {
        return 'object';
    }

    // console.log('value', value);

    throw new Error('Unexpected value type.');
};
