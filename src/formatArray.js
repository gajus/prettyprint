import _ from 'lodash';

export default (
    inputArray: Object,
    blockIndent: string,
    indentTemplate: string,
    visited: Array<Object>,
    formatValueCallack,
    valueIndex,
    path: Array<string> = []
  ) => {
  if (valueIndex) {
    valueIndex.increment();
  }

  if (inputArray.length === 0) {
    return '[]';
  }

  const values = _.map(inputArray, (value, key) => {
    const newBlockIntend = blockIndent + indentTemplate;

    return newBlockIntend + formatValueCallack(value, newBlockIntend, indentTemplate, visited, valueIndex, path.concat([key]));
  });

  if (valueIndex) {
    valueIndex.increment();
  }

  return '[\n' + values.join(',\n') + '\n' + blockIndent + ']';
};
