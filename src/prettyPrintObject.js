import _ from 'lodash';
import formatValue from './formatValue';

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
