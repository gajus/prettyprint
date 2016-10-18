import _ from 'lodash';
import {
    expect
} from 'chai';
import formatValue from './../src/formatValue';
import createValueIndex from './../src/createValueIndex';

const formatAnnotatedObject = (subject) => {
  let formattedValue;

  const valueIndex = createValueIndex();

  formattedValue = formatValue(subject, '', '    ', [], valueIndex);

  const valueIndexData = valueIndex.getValueIndexData();

  formattedValue = _.map(formattedValue.split('\n'), (line, linuNumber) => {
    if (_.has(valueIndexData, linuNumber)) {
      let append;

      append = ' : ' + valueIndexData[linuNumber].type;

      if (line[line.length - 1] !== ',') {
        append = ' ' + append;
      }

      // eslint-disable-next-line
      line += append;
    }

    return line;
  }).join('\n');

  return formattedValue;
};

const getPathIndex = (subject) => {
  const valueIndex = createValueIndex();

  formatValue(subject, '', '    ', [], valueIndex);

  const pathIndex = {};

  _.forEach(valueIndex.getValueIndexData(), (value) => {
    pathIndex[value.path.join('.')] = value.value;
  });

  return pathIndex;
};

describe('createValueIndex()', () => {
  describe('using value index to annotate type', () => {
    it('annotates a string value', () => {
      const annotatedObject = formatAnnotatedObject('foo');

      expect(annotatedObject).to.equal('"foo"  : string');
    });
    it('annotates an empty array', () => {
      const annotatedObject = formatAnnotatedObject([]);

      expect(annotatedObject).to.equal('[]  : array');
    });
    it('annotates an array with string values', () => {
      const annotatedObject = formatAnnotatedObject(['a', 'b', 'c']);

      expect(annotatedObject).to.equal('[\n    "a", : string\n    "b", : string\n    "c"  : string\n]  : array');
    });
    it('annotates an empty object', () => {
      const annotatedObject = formatAnnotatedObject({});

      expect(annotatedObject).to.equal('{}  : object');
    });
    it('annotates an object with string values', () => {
      const annotatedObject = formatAnnotatedObject({
        bar: 'BAR',
        baz: 'BAZ',
        foo: 'FOO'
      });

      expect(annotatedObject).to.equal('{\n    bar: "BAR", : string\n    baz: "BAZ", : string\n    foo: "FOO"  : string\n}  : object');
    });
  });
  describe('building path', () => {
    it('has correct path for an object', () => {
      const pathIndex = getPathIndex({foo: 1});

      expect(pathIndex).to.have.property('foo', 1);
    });

    it('has correct path for a nested object', () => {
      const pathIndex = getPathIndex({foo: {bar: 1}});

      expect(pathIndex).to.have.property('foo.bar', 1);
    });

    it('has correct path for an array', () => {
      const pathIndex = getPathIndex({foo: ['a', 'b', 'c']});

      expect(pathIndex).to.have.property('foo.2', 'c');
    });
  });
});
