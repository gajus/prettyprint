import _ from 'lodash';

export default () => {
  let currentLine;

  const valueIndex = {};

  currentLine = -1;

  const add = (value) => {
    if (_.has(valueIndex, currentLine)) {
      throw new Error('Line already set.');
    }

    valueIndex[currentLine] = value;
  };

  const increment = () => {
    currentLine++;

    return currentLine;
  };

  const getValueIndexData = () => {
    return valueIndex;
  };

  return {
    add,
    getValueIndexData,
    increment
  };
};
