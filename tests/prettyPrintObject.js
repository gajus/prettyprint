import _ from 'lodash';
import {
    expect
} from 'chai';
import formatValue from './../src/prettyPrintObject';

let expectToEqual;

expectToEqual = (input: Object, output: string): undefined => {
    let expectedFormat,
        formattedObject,
        indentSize;

    formattedObject = input;

    expectedFormat = _.trim(output, '\n');

    indentSize = expectedFormat.match(/^\s+/)[0].length;

    indentSize = _.indexOf(output, '{') - 1;
    expectedFormat = _.map(expectedFormat.split('\n'), (line) => {
        return line.slice(indentSize);
    });
    expectedFormat = expectedFormat.join('\n');

    expect(formattedObject).to.equal(expectedFormat);
};

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

    it('uses postFormatValueCallback callback to decorate the value line', () => {
        expectToEqual(formatValue(subjectData, {
            postFormatValueCallback: (value) => {
                return value + ' | FOO';
            }
        }), `
            {
                foo: {
                    bar: "BAR" | FOO
                } | FOO
            } | FOO
        `)
    });
});
