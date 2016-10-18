import {
    expect
} from 'chai';
import formatValue from './../src/prettyPrintObject';

describe('prettyPrintObject()', () => {
  let subjectData;

  beforeEach(() => {
    subjectData = {
      foo: {
        bar: 'BAR'
      }
    };
  });

  it('uses custom indentationTemplate', () => {
    expect(formatValue(subjectData, {
      indentationTemplate: 'X'
    })).to.equal('{\nXfoo: {\nXXbar: "BAR"\nX}\n}\n');
  });
});
