import _ from 'lodash';
import {
    expect
} from 'chai';
import formatValue from './../src/formatValue';
import createValueIndex from './../src/createValueIndex';

let formatAnnotatedObject,
    getPathIndex;

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

getPathIndex = (subject) => {
    let valueIndex,
        pathIndex;

    valueIndex = createValueIndex();

    formatValue(subject, '', '    ', [], valueIndex);

    pathIndex = {};

    _.forEach(valueIndex.getValueIndexData(), (value) => {
        pathIndex[value.path.join('.')] = value.value;
    });

    return pathIndex;
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
    describe('building path', () => {
        it('has correct path for an object', () => {
            let pathIndex;

            pathIndex = getPathIndex({foo: 1});

            expect(pathIndex).to.have.property('foo', 1);
        });

        it('has correct path for a nested object', () => {
            let pathIndex;

            pathIndex = getPathIndex({foo: {bar: 1}});

            expect(pathIndex).to.have.property('foo.bar', 1);
        });

        it('has correct path for an array', () => {
            let pathIndex;

            pathIndex = getPathIndex({foo: ['a', 'b', 'c']});

            expect(pathIndex).to.have.property('foo.2', 'c');
        });
    });
});
