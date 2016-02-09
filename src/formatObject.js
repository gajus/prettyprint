export default (
        inputObject: Object,
        blockIndent: string,
        indentTemplate: string,
        visited: Array<Object>,
        formatValueCallback,
        valueIndex,
        path: Array<string> = []
    ) => {
    var values;

    if (valueIndex) {
        valueIndex.increment();
    }

    if (Object.keys(inputObject).length === 0) {
        return '{}';
    }

    values = Object.keys(inputObject).map(key => {
        const value = inputObject[key];

        const newBlockIndent = blockIndent + indentTemplate;

        return newBlockIndent + key + ': ' + formatValueCallback(value, newBlockIndent, indentTemplate, visited, valueIndex, path.concat([key]));
    });

    if (valueIndex) {
        valueIndex.increment();
    }

    return '{\n' + values.join(',\n') + '\n' + blockIndent + '}';
};
