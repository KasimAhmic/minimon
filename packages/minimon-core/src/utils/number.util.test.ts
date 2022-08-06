import { rescale, roundFloat } from './number.util';

describe('Number Util', () => {
  describe('rescale', () => {
    it('rescales the output', () => {
      const result = rescale(50, [0, 100], [0, 1]);

      expect(result).toEqual(0.5);
    });
  });

  describe('roundFloat', () => {
    test.each([
      [Math.PI, 3, 0],
      [Math.PI, 3.14, 2],
      [Math.PI, 3.142, 3],
      [Math.PI, 3.1416, 4],
    ])('rounds %s to %s', (input: number, expected: number, decimalPlaces: number) => {
      expect(roundFloat(input, decimalPlaces)).toEqual(expected);
    });

    it('rounds to 2 decimal places by default', () => {
      expect(roundFloat(Math.PI)).toEqual(3.14);
    });
  });
});
