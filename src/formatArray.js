import _ from 'lodash';

export default (
        inputArray: Object,
        blockIndent: string,
        indentTemplate: string,
        visited: Array<Object>,
        formatValueCallack,
        postFormatValueCallback
    ) => {
    let values;

    if (inputArray.length === 0) {
        return '[]';
    }

    values = _.map(inputArray, (value) => {
        let newBlockIntend;

        newBlockIntend = blockIndent + indentTemplate;

        return newBlockIntend + formatValueCallack(value, newBlockIntend, indentTemplate, visited, postFormatValueCallback);
    });

    return '[\n' + values.join(',\n') + '\n' + blockIndent + ']';
};
