export default (
        inputArray: Object,
        blockIndent: string,
        indentTemplate: string,
        visited: Array<Object>,
        formatValueCallack,
        valueIndex,
        path: Array<string> = []
    ) => {
    let values;

    if (valueIndex) {
        valueIndex.increment();
    }

    if (inputArray.length === 0) {
        return '[]';
    }

    values = inputArray.map((value, key) => {
        let newBlockIntend;

        newBlockIntend = blockIndent + indentTemplate;

        return newBlockIntend + formatValueCallack(value, newBlockIntend, indentTemplate, visited, valueIndex, path.concat([key]));
    });

    if (valueIndex) {
        valueIndex.increment();
    }

    return '[\n' + values.join(',\n') + '\n' + blockIndent + ']';
};
