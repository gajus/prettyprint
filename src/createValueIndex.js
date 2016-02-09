export default () => {
    let add,
        currentLine,
        getValueIndexData,
        increment,
        valueIndex;

    valueIndex = {};
    currentLine = -1;

    add = (value) => {
        if (!!(valueIndex[currentLine])) {
            throw new Error('Line already set.');
        }

        valueIndex[currentLine] = value;
    };

    increment = () => {
        currentLine++;

        return currentLine;
    };

    getValueIndexData = () => {
        return valueIndex;
    };

    return {
        add,
        getValueIndexData,
        increment
    };
};
