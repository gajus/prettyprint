import _ from 'lodash';
import {
    expect
} from 'chai';
import formatValue from './../src/formatValue';
import createValueIndex from './../src/createValueIndex';

let formatAnnotatedObject;

formatAnnotatedObject = (subject) => {
    let formattedValue,
        valueIndex,
        valueIndexData;

    valueIndex = createValueIndex();

    formattedValue = formatValue(subject, '', '    ', [], valueIndex);
    valueIndexData = valueIndex.getValueIndexData();

    return formattedValue = _.map(formattedValue.split('\n'), (line, linuNumber) => {
        if (_.has(valueIndexData, linuNumber)) {
            let append,
                valueType;

            append = ' : ' + valueIndexData[linuNumber].type;

            if (line[line.length - 1] !== ',') {
                append = ' ' + append;
            }

            line +=  append;
        }

        return line;
    }).join('\n');
};

describe('createValueIndex()', () => {
    describe('using value index to annotate type', () => {
        it('annotates a string value', () => {
            let annotatedObject;

            annotatedObject = formatAnnotatedObject('foo');

            expect(annotatedObject).to.equal('"foo"  : string');
        });
        it('annotates an empty array', () => {
            let annotatedObject;

            annotatedObject = formatAnnotatedObject([]);

            expect(annotatedObject).to.equal('[]  : array');
        });
        it('annotates an array with string values', () => {
            let annotatedObject;

            annotatedObject = formatAnnotatedObject(['a', 'b', 'c']);

            expect(annotatedObject).to.equal('[\n    "a", : string\n    "b", : string\n    "c"  : string\n]  : array');
        });
        it('annotates an empty object', () => {
            let annotatedObject;

            annotatedObject = formatAnnotatedObject({});

            expect(annotatedObject).to.equal('{}  : object');
        });
        it('annotates an object with string values', () => {
            let annotatedObject;

            annotatedObject = formatAnnotatedObject({a: 'A', b: 'B', c: 'C'});

            expect(annotatedObject).to.equal('{\n    a: "A", : string\n    b: "B", : string\n    c: "C"  : string\n}  : object');
        });
    });
});
