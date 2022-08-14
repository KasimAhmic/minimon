import Big from 'big.js';
import { ByteUtil } from './byte.util';

describe('ByteUtil', () => {
  it('returns a ByteUtil object', () => {
    const t = new ByteUtil(16);

    expect(t).toBeInstanceOf(ByteUtil);
  });

  test.each([
    ByteUtil.bits,
    ByteUtil.kilobits,
    ByteUtil.megabits,
    ByteUtil.gigabits,
    ByteUtil.terabits,
    ByteUtil.petabits,
    ByteUtil.exabits,
    ByteUtil.zettabits,
    ByteUtil.yottabits,
    ByteUtil.kibibits,
    ByteUtil.mebibits,
    ByteUtil.gibibits,
    ByteUtil.tebibits,
    ByteUtil.pebibits,
    ByteUtil.exbibits,
    ByteUtil.zebibits,
    ByteUtil.yobibits,
    ByteUtil.bytes,
    ByteUtil.kilobytes,
    ByteUtil.megabytes,
    ByteUtil.gigabytes,
    ByteUtil.terabytes,
    ByteUtil.petabytes,
    ByteUtil.exabytes,
    ByteUtil.zettabytes,
    ByteUtil.yottabytes,
    ByteUtil.kibibytes,
    ByteUtil.mebibytes,
    ByteUtil.gibibytes,
    ByteUtil.tebibytes,
    ByteUtil.pebibytes,
    ByteUtil.exbibytes,
    ByteUtil.zebibytes,
    ByteUtil.yobibytes,
  ])('%s returns a ByteUtil object', (constructor: (bits: number) => ByteUtil) => {
    expect(constructor(16)).toBeInstanceOf(ByteUtil);
  });

  test.each([
    [ByteUtil.bits, 1, 'bit', Big('1')],
    [ByteUtil.kilobits, 1, 'kilobit', Big('1000')],
    [ByteUtil.megabits, 1, 'megabit', Big('1000000')],
    [ByteUtil.gigabits, 1, 'gigabit', Big('1000000000')],
    [ByteUtil.terabits, 1, 'terabit', Big('1000000000000')],
    [ByteUtil.petabits, 1, 'petabit', Big('1000000000000000')],
    [ByteUtil.exabits, 1, 'exabit', Big('1000000000000000000')],
    [ByteUtil.zettabits, 1, 'zettabit', Big('1000000000000000000000')],
    [ByteUtil.yottabits, 1, 'yottabit', Big('1000000000000000000000000')],
    [ByteUtil.kibibits, 1, 'kibibit', Big('1024')],
    [ByteUtil.mebibits, 1, 'mebibit', Big('1048576')],
    [ByteUtil.gibibits, 1, 'gibibit', Big('1073741824')],
    [ByteUtil.tebibits, 1, 'tebibit', Big('1099511627776')],
    [ByteUtil.pebibits, 1, 'pebibit', Big('1125899906842624')],
    [ByteUtil.exbibits, 1, 'exbibit', Big('1152921504606846976')],
    [ByteUtil.zebibits, 1, 'zebibit', Big('1180591620717411303424')],
    [ByteUtil.yobibits, 1, 'yobibit', Big('1208925819614629174706176')],
    [ByteUtil.bytes, 1, 'byte', Big('8')],
    [ByteUtil.kilobytes, 1, 'kilobyte', Big('8000')],
    [ByteUtil.megabytes, 1, 'megabyte', Big('8000000')],
    [ByteUtil.gigabytes, 1, 'gigabyte', Big('8000000000')],
    [ByteUtil.terabytes, 1, 'terabyte', Big('8000000000000')],
    [ByteUtil.petabytes, 1, 'petabyte', Big('8000000000000000')],
    [ByteUtil.exabytes, 1, 'exabyte', Big('8000000000000000000')],
    [ByteUtil.zettabytes, 1, 'zettabyte', Big('8000000000000000000000')],
    [ByteUtil.yottabytes, 1, 'yottabyte', Big('8000000000000000000000000')],
    [ByteUtil.kibibytes, 1, 'kibibyte', Big('8192')],
    [ByteUtil.mebibytes, 1, 'mebibyte', Big('8388608')],
    [ByteUtil.gibibytes, 1, 'gibibyte', Big('8589934592')],
    [ByteUtil.tebibytes, 1, 'tebibyte', Big('8796093022208')],
    [ByteUtil.pebibytes, 1, 'pebibyte', Big('9007199254740992')],
    [ByteUtil.exbibytes, 1, 'exbibyte', Big('9223372036854775808')],
    [ByteUtil.zebibytes, 1, 'zebibyte', Big('9444732965739290427392')],
    [ByteUtil.yobibytes, 1, 'yobibyte', Big('9671406556917033397649408')],
  ])(
    '%s converts %s %s to %s bits',
    (constructor: (bits: number) => ByteUtil, amount: number, _: string, expected: Big) => {
      expect(constructor(amount).toBits()).toBe(expected.toNumber());
    },
  );
});
