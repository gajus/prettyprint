import _ from 'lodash';
import {
    expect
} from 'chai';
import formatValue from './../src/formatValue';

let expectToEqual;

expectToEqual = (input: Object, output: string): undefined => {
    let expectedFormat,
        formattedObject,
        indentSize;

    formattedObject = formatValue(input);

    expectedFormat = _.trim(output, '\n');

    indentSize = expectedFormat.match(/^\s+/)[0].length;

    indentSize = _.indexOf(output, '{') - 1;
    expectedFormat = _.map(expectedFormat.split('\n'), (line) => {
        return line.slice(indentSize);
    });
    expectedFormat = expectedFormat.join('\n');
    expectedFormat = _.trim(expectedFormat, '\n');

    expect(formattedObject).to.equal(expectedFormat);
};

describe('formatValue()', () => {
    describe('data type', () => {
        describe('array', () => {
            it('formats empty array', () => {
                expectToEqual({
                    foo: []
                }, `
                    {
                        foo: []
                    }
                `);
            });
            it('formats an array with a single string value', () => {
                expectToEqual({
                    foo: ['FOO']
                }, `
                    {
                        foo: [
                            "FOO"
                        ]
                    }
                `);
            });
            it('formats an array with a single object value', () => {
                expectToEqual({
                    foo: [{bar: 'BAR'}]
                }, `
                    {
                        foo: [
                            {
                                bar: "BAR"
                            }
                        ]
                    }
                `);
            });
        });
        describe('boolean', () => {
            it('formats a boolean value', () => {
                expectToEqual({
                    foo: false
                }, `
                    {
                        foo: false
                    }
                `);
            });
        });
        describe('Object', () => {
            it('formats an Object value', () => {
                expectToEqual({
                    foo: {}
                }, `
                    {
                        foo: {}
                    }
                `);
            });

            it('formats an Object value', () => {
                expectToEqual({
                    foo: {
                        bar: {}
                    }
                }, `
                    {
                        foo: {
                            bar: {}
                        }
                    }
                `);
            });
        });
        describe('number', () => {
            it('formats a number value', () => {
                expectToEqual({
                    foo: 10.20
                }, `
                    {
                        foo: 10.2
                    }
                `);
            });
        });
        describe('string', () => {
            it('formats a string value', () => {
                expectToEqual({
                    foo: 'FOO'
                }, `
                    {
                        foo: "FOO"
                    }
                `);
            });
        });
        describe('function', () => {
            context('with name', () => {
                it('formats a function value', () => {
                    expectToEqual({
                        foo: function FOO () {}
                    }, `
                        {
                            foo: function FOO () { ... }
                        }
                    `);
                });
            });
            context('with parameters', () => {
                it('formats a function value', () => {
                    expectToEqual({
                        foo: function (a, b) {}
                    }, `
                        {
                            foo: function (a, b) { ... }
                        }
                    `);
                });
            });
            context('arrow function', () => {
                it('formats a function value', () => {
                    expectToEqual({
                        foo: (a, b) => {}
                    }, `
                        {
                            foo: (a, b) => { ... }
                        }
                    `);
                });
            });
            it('formats a function value', () => {
                expectToEqual({
                    foo: function () {}
                }, `
                    {
                        foo: function () { ... }
                    }
                `);
            });
        });
        describe('undefined', () => {
            it('formats an undefined value', () => {
                expectToEqual({
                    foo: undefined
                }, `
                    {
                        foo: undefined
                    }
                `);
            });
        });
        describe('null', () => {
            it('formats a null value', () => {
                expectToEqual({
                    foo: null
                }, `
                    {
                        foo: null
                    }
                `);
            });
        });
    });
    describe('complex example that should not break', () => {
        it('does not break', () => {
            expectToEqual({
                foo: [
                    {
                        foo: 'FOO',
                        bar: [
                            1,
                            2,
                            3
                        ]
                    }
                ]
            }, `
                {
                    foo: [
                        {
                            foo: "FOO",
                            bar: [
                                1,
                                2,
                                3
                            ]
                        }
                    ]
                }
            `);
        });
    });
    describe('circular reference', () => {
        it('does not break', () => {
            let subject;

            subject = {
                foo: {}
            };

            subject.bar = subject.foo;

            expect(() => {
                formatValue(subject)
            }).to.throw(Error, 'Circular references are not supported.');
        });
    });
});
