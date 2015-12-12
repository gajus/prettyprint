# Pretty-print Object

[![Travis build status](http://img.shields.io/travis/gajus/pretty-print-object/master.svg?style=flat-square)](https://travis-ci.org/gajus/pretty-print-object)
[![NPM version](http://img.shields.io/npm/v/pretty-print-object.svg?style=flat-square)](https://www.npmjs.com/package/pretty-print-object)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-brightgreen.svg?style=flat-square)](https://github.com/gajus/canonical)

Function to pretty-print an object with an ability to annotate every value.

## API

```js
/**
 * @typedef {Function} postFormatValueCallback
 * @param {string} value Formatted value.
 * @returns {string}
 */

/**
 * @typedef {Object} optionsType
 * @property {string} indentTemplate String used to indent one level of code (default: '    ').
 * @property {postFormatValueCallback} postFormatValueCallback Function used to annotate a value.
 */

/**
 * @param {Object} subject
 * @param {optionsType} options
 * @returns {string}
 */
prettyPrintObject;
```

## Use

```js
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

```

```
#1 {}

#2 {
    foo: "FOO"
}

#3 {
    foo: {
        bar: "BAR",
        baz: "BAZ"
    }
}

#4 {
    foo: [
        "BAR",
        "BAZ"
    ]
}

#5 {
    foo: [
        {
            bar: "BAR"
        },
        {
            baz: "BAZ"
        }
    ]
}

#6 {
    foo: [
        {
            testUndefined: undefined,
            testNull: null,
            testFunction: function (a, b) { ... },
            testArrowFunction: (a, b) => { ... },
            testNaN: NaN,
            testNumber: 10.2,
            testBoolean: true
        }
    ]
}

#7 {
    foo: [
        {
            testUndefined: undefined | FOO,
            testNull: null | FOO,
            testFunction: function (a, b) { ... } | FOO,
            testArrowFunction: (a, b) => { ... } | FOO,
            testNaN: NaN | FOO,
            testNumber: 10.2 | FOO,
            testBoolean: true | FOO
        } | FOO
    ] | FOO
} | FOO
```

## Install

```sh
npm install pretty-print-object
```
