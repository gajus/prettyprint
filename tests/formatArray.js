import _ from 'lodash';
import {
    expect
} from 'chai';
import formatArray from './../src/formatArray';

describe('formatArray()', () => {
  let curriedFormatArray;

  beforeEach(() => {
    curriedFormatArray = _.curryRight(formatArray);

    curriedFormatArray = curriedFormatArray('', '', [], (value) => {
      return '{' + value + '}';
    }, null);
  });

  context('empty array', () => {
    it('produces an empty list', () => {
      expect(curriedFormatArray([])).to.equal('[]');
    });
  });

  it('produces a list of values', () => {
    expect(curriedFormatArray(['a', 'b', 'c'])).to.equal('[\n{a},\n{b},\n{c}\n]');
  });
});
