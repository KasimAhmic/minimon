import { timed, toMillis } from './time.util';

describe('Time Util', () => {
  describe('timed', () => {
    it('times to function and returns the result', async () => {
      const [result, duration] = await timed(() => {
        return new Promise((resolve) => setTimeout(() => resolve('done'), 5));
      });

      expect(result).toBe('done');
      expect(duration).toBeGreaterThanOrEqual(5);
    });
  });

  describe('toMillis', () => {
    test.each([
      [3, '3.000 ms'],
      [Math.PI, '3.142 ms'],
    ])('%s is transformed to %s', (milliseconds: number, expected: string) => {
      expect(toMillis(milliseconds)).toBe(expected);
    });
  });
});
