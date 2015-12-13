import prettyPrintObject from './../prettyPrintObject';

console.log(prettyPrintObject({
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
