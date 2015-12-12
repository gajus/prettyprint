import _ from 'lodash';

export default (value): string => {
    if (_.isArray(value)) {
        return 'array';
    }

    if (_.isBoolean(value)) {
        return 'boolean';
    }

    // _.isDate
    // _.isElement
    // _.isError

    if (_.isFunction(value)) {
        return 'function';
    }

    if (_.isNaN(value)) {
        return 'nan';
    }

    // _.isNative

    if (_.isNull(value)) {
        return 'null';
    }

    if (_.isNumber(value)) {
        return 'number';
    }

    if (_.isRegExp(value)) {
        return 'regexp';
    }

    if (_.isString(value)) {
        return 'string';
    }

    // isTypedArray

    if (_.isUndefined(value)) {
        return 'undefined';
    }

    if (_.isObject(value)) {
        return 'object';
    }

    // console.log('value', value);

    throw new Error('Unexpected value type.');
};
