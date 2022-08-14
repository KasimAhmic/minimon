import { ByteUtil } from './byte.util';

describe('ByteUtil', () => {
  it('returns a ByteUtil object', () => {
    const t = new ByteUtil(16);

    expect(t).toBeInstanceOf(ByteUtil);
  });
});
