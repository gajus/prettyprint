# Prettyprint Object

[![Travis build status](http://img.shields.io/travis/gajus/prettyprint/master.svg?style=flat-square)](https://travis-ci.org/gajus/prettyprint)
[![NPM version](http://img.shields.io/npm/v/pretty-print-object.svg?style=flat-square)](https://www.npmjs.com/package/pretty-print-object)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-brightgreen.svg?style=flat-square)](https://github.com/gajus/canonical)

Function to [prettyprint](https://en.wikipedia.org/wiki/Prettyprint) an object with an ability to annotate every value.

## API

```js
/**
 * @typedef {Object} optionsType
 * @property {string} indentTemplate String used to indent one level of code (default: '    ').
 * @property {valueIndex|null} valueIndex A function used to index values in the object, the line of declaration in the output and the internal type of the value.
 */

/**
 * @param {Object} subject
 * @param {optionsType} options
 * @returns {string}
 */
prettyprint;
```

## Use

```js
import prettyprint from 'prettyprint';
```

### Format Object for `console.log`

```js
console.log(prettyprint({
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
```

```
{
    foo: "FOO",
    bar: "BAR",
    emptyArray: [],
    emptyObject: {},
    arrayWithLiteralValues: [
        1,
        2,
        3
    ],
    objectWithLiteralValues: {
        1: "foo",
        2: "bar",
        3: "baz"
    },
    types: [
        undefined,
        null,
        function (a, b) { ... },
        (a, b) => { ... },
        NaN,
        Infinity,
        10.2,
        true
    ]
}
```

### Annotate Value Types

This library provides a method `createValueIndex`.

```js
import {
    createValueIndex
} from 'prettyprint';
```

`createValueIndex` is a factory function that will produce an instance of `valueIndex`. `valueIndex` object implements methods `add` and `increment`. These methods are used internally to keep track of where and what values are added to the formatted object string.

`getValueIndexData` method returns an object describing the collected data, e.g.

```js
{
    1: {
        path: [
            'foo'
        ]
        value: 'foo',
        type: 'string'
    }
}
```

For this example, we are going to build a helper function `formatAnnotatedObject` that formats object output, indexes object values and annotates the formatted output with value types.

```js
import _ from 'lodash';
import prettyprint, {
    createValueIndex
} from 'prettyprint';

let formatAnnotatedObject;

formatAnnotatedObject = (subject) => {
    let formattedValue,
        valueIndex,
        valueIndexData;

    valueIndex = createValueIndex();

    formattedValue = prettyprint(subject, {
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
```

We are going to annotate data from the previous example:

```js
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
```

```
{
    foo: "FOO", : string
    bar: "BAR", : string
    emptyArray: [], : array
    emptyObject: {}, : object
    arrayWithLiteralValues: [
        1, : number
        2, : number
        3 : number
    ], : array
    objectWithLiteralValues: {
        1: "foo", : string
        2: "bar", : string
        3: "baz" : string
    }, : object
    types: [
        undefined, : undefined
        null, : null
        function (a, b) { ... }, : function
        (a, b) => { ... }, : function
        NaN, : nan
        Infinity, : number
        10.2, : number
        true : boolean
    ] : array
} : object
```

## Install

```sh
npm install prettyprint
```
