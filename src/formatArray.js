import _ from 'lodash';

export default (
        inputArray: Object,
        blockIndent: string,
        indentTemplate: string,
        visited: Array<Object>,
        formatValueCallack,
        valueIndex
    ) => {
    let values;

    if (valueIndex) {
        valueIndex.increment();
    }

    if (inputArray.length === 0) {
        return '[]';
    }

    values = _.map(inputArray, (value) => {
        let newBlockIntend;

        newBlockIntend = blockIndent + indentTemplate;

        return newBlockIntend + formatValueCallack(value, newBlockIntend, indentTemplate, visited, valueIndex);
    });

    if (valueIndex) {
        valueIndex.increment();
    }

    return '[\n' + values.join(',\n') + '\n' + blockIndent + ']';
};
