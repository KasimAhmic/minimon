import { noop } from './general.util';

describe('General Util', () => {
  describe('noop', () => {
    it('returns nothing', () => {
      const value = noop();

      expect(value).toBe(void 0);
    });
  });
});
