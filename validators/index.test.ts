import { validateCurrencyInput } from '@/validators/index';

describe('Given the scale is 2', () => {
    test('Input letter', () => {
        expect(() => validateCurrencyInput('a', 2)).toThrow();
    });

    test('Input empty string', () => {
        expect(() => validateCurrencyInput('', 2)).toThrow();
    });

    test('Input positive integer', () => {
        expect(() => validateCurrencyInput('1', 2)).not.toThrow();
    });

    test('Input negative integer', () => {
        expect(() => validateCurrencyInput('-1', 2)).toThrow();
    });

    test('Input number ending with dot', () => {
        expect(() => validateCurrencyInput('45.', 2)).not.toThrow();
    });

    test('Input number with scale lower than expected', () => {
        expect(() => validateCurrencyInput('45.1', 2)).not.toThrow();
    });

    test('Input number with scale equal to expected', () => {
        expect(() => validateCurrencyInput('45.01', 2)).not.toThrow();
    });

    test('Input number with scale higher than expected', () => {
        expect(() => validateCurrencyInput('45.123', 2)).toThrow();
    });

    test('Input letter after number', () => {
        expect(() => validateCurrencyInput('9a', 2)).toThrow();
    });

    test('Input letter after dot', () => {
        expect(() => validateCurrencyInput('9.a', 2)).toThrow();
    });

    test('Input only dot', () => {
        expect(() => validateCurrencyInput('.', 2)).toThrow();
    });

    test('Input 2x dot', () => {
        expect(() => validateCurrencyInput('9.23.', 2)).toThrow();
    });

    test('Input zero', () => {
        expect(() => validateCurrencyInput('0', 2)).not.toThrow();
    });

    test('Input 2x zero', () => {
        expect(() => validateCurrencyInput('00', 2)).toThrow();
    });

    test('Input Infinity', () => {
        expect(() => validateCurrencyInput('Infinity', 2)).toThrow();
    });
});

describe('Given the scale is 3', () => {
    test('Input number with scale lower than expected', () => {
        expect(() => validateCurrencyInput('45.1', 3)).not.toThrow();
    });

    test('Input number with scale equal to expected', () => {
        expect(() => validateCurrencyInput('45.001', 3)).not.toThrow();
    });

    test('Input number with scale higher than expected', () => {
        expect(() => validateCurrencyInput('45.1234', 3)).toThrow();
    });
});
