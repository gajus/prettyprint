import _ from 'lodash';
import prettyPrintObject, {
    createValueIndex
} from './../prettyPrintObject';

const formatAnnotatedObject = (subject) => {
  let formattedValue;

  const valueIndex = createValueIndex();

  formattedValue = prettyPrintObject(subject, {
    valueIndex
  });

  const valueIndexData = valueIndex.getValueIndexData();

  formattedValue = _.map(formattedValue.split('\n'), (line, linuNumber) => {
    if (_.has(valueIndexData, linuNumber)) {
      // eslint-disable-next-line
      line += ' : ' + valueIndexData[linuNumber].type;
    }

    return line;
  }).join('\n');

  return formattedValue;
};

/* eslint-disable */
console.log(formatAnnotatedObject({
  foo: 'FOO',
  bar: 'BAR',
  emptyArray: [],
  emptyObject: {},
  arrayWithLiteralValues: [
    1,
    2,
    3
  ],
  objectWithLiteralValues: {
    1: 'foo',
    2: 'bar',
    3: 'baz'
  },
  types: [
    undefined,
    null,
    function (a, b) {},
    (a, b) => {},
    NaN,
    Infinity,
    10.2,
    true
  ]
}));
