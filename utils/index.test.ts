import { convertAmount } from '.';

describe('convertAmount', () => {
    test('122.55 / 4.382', () => {
        expect(convertAmount(122.55, 4.382)).toBe(27.96);
    });

    test('123.4 / 4.382', () => {
        expect(convertAmount(123.4, 4.382)).toBe(28.16);
    });

    test('6582 / 4.382', () => {
        expect(convertAmount(6582, 4.382)).toBe(1502.05);
    });

    test('200 / 20', () => {
        expect(convertAmount(200, 20)).toBe(10);
    });
});
