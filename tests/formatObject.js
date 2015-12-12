import _ from 'lodash';

import {
    expect
} from 'chai';

import formatObject from './../src/formatObject';

describe('formatObject()', () => {
    let curriedFormatObject;

    beforeEach(() => {
        curriedFormatObject = _.curryRight(formatObject);

        curriedFormatObject = curriedFormatObject('', '    ', [], (value) => {
            return '{' + value + '}';
        }, _.constant);
    });

    context('empty object', () => {
        it('produces an empty object', () => {
            expect(curriedFormatObject({})).to.equal('{}');
        });
    });

    it('produces a list of values', () => {
        let inputObject;

        inputObject = {
            a: 'A',
            b: 'B',
            c: 'C'
        };

        expect(curriedFormatObject(inputObject)).to.equal('{\n    a: {A},\n    b: {B},\n    c: {C}\n}');
    });
});
