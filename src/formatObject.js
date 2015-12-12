import _ from 'lodash';

export default (
        inputObject: Object,
        blockIndent: string,
        indentTemplate: string,
        visited: Array<Object>,
        formatValueCallback,
        postFormatValueCallback
    ) => {
    var values;

    if (_.size(inputObject) === 0) {
        return '{}';
    }

    values = _.map(inputObject, (value, key) => {
        let newBlockIntend;

        newBlockIntend = blockIndent + indentTemplate;

        return newBlockIntend + key + ': ' + formatValueCallback(value, newBlockIntend, indentTemplate, visited, postFormatValueCallback);
    });

    return '{\n' + values.join(',\n') + '\n' + blockIndent + '}';
};
