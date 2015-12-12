import prettyPrintObject from './prettyPrintObject';

console.log('#1', prettyPrintObject({}));

console.log('#2', prettyPrintObject({
    foo: 'FOO'
}));

console.log('#3', prettyPrintObject({
    foo: {
        bar: 'BAR',
        baz: 'BAZ'
    }
}));

console.log('#4', prettyPrintObject({
    foo: [
        'BAR',
        'BAZ'
    ]
}));

console.log('#5', prettyPrintObject({
    foo: [
        {
            bar: 'BAR'
        },
        {
            baz: 'BAZ'
        }
    ]
}));

console.log('#6', prettyPrintObject({
    foo: [
        {
            testUndefined: undefined,
            testNull: null,
            testFunction: function (a, b) {},
            testArrowFunction: (a, b) => {},
            testNaN: NaN,
            testNumber: 10.2,
            testBoolean: true
        }
    ]
}));

console.log('#7', prettyPrintObject({
    foo: [
        {
            testUndefined: undefined,
            testNull: null,
            testFunction: function (a, b) {},
            testArrowFunction: (a, b) => {},
            testNaN: NaN,
            testNumber: 10.2,
            testBoolean: true
        }
    ]
}, {
    postFormatValueCallback: (value) => {
        return value + ' | FOO';
    }
}));
