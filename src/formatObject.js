import _ from 'lodash';

export default (
    inputObject: Object,
    blockIndent: string,
    indentTemplate: string,
    visited: Array<Object>,
    formatValueCallback,
    valueIndex,
    path: Array<string> = []
  ) => {
  if (valueIndex) {
    valueIndex.increment();
  }

  if (_.size(inputObject) === 0) {
    return '{}';
  }

  const values = _.map(inputObject, (value, key) => {
    const newBlockIntend = blockIndent + indentTemplate;

    return newBlockIntend + key + ': ' + formatValueCallback(value, newBlockIntend, indentTemplate, visited, valueIndex, path.concat([key]));
  });

  if (valueIndex) {
    valueIndex.increment();
  }

  return '{\n' + values.join(',\n') + '\n' + blockIndent + '}';
};
