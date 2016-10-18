import _ from 'lodash';
import {
    expect
} from 'chai';
import formatObject from './../src/formatObject';

describe('formatObject()', () => {
  let curriedFormatObject;

  beforeEach(() => {
    curriedFormatObject = _.curryRight(formatObject);

    curriedFormatObject = curriedFormatObject('', '    ', [], (value) => {
      return '{' + value + '}';
    }, null);
  });

  context('empty object', () => {
    it('produces an empty object', () => {
      expect(curriedFormatObject({})).to.equal('{}');
    });
  });

  it('produces a list of values', () => {
    const inputObject = {
      bar: 'BAR',
      baz: 'BAZ',
      foo: 'FOO'
    };

    expect(curriedFormatObject(inputObject)).to.equal('{\n    bar: {BAR},\n    baz: {BAZ},\n    foo: {FOO}\n}');
  });
});
