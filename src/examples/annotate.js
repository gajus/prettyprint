import _ from 'lodash';
import prettyPrintObject, {
    createValueIndex
} from './../prettyPrintObject';

let formatAnnotatedObject;

formatAnnotatedObject = (subject) => {
    let formattedValue,
        valueIndex,
        valueIndexData;

    valueIndex = createValueIndex();

    formattedValue = prettyPrintObject(subject, {
        valueIndex: valueIndex
    });
    valueIndexData = valueIndex.getValueIndexData();

    return formattedValue = _.map(formattedValue.split('\n'), (line, linuNumber) => {
        if (_.has(valueIndexData, linuNumber)) {
            line += ' : ' + valueIndexData[linuNumber].type;
        }

        return line;
    }).join('\n');
};

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
        3: 'baz',
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
