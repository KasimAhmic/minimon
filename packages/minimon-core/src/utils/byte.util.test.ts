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

  it('toBits coverts to bits', () => {
    expect(ByteUtil.petabytes(1).toBits()).toBe(8000000000000000);
  });

  it('toKilobits coverts to kilobits', () => {
    expect(ByteUtil.petabytes(1).toKilobits()).toBe(8000000000000);
  });

  it('toMegabits coverts to megabits', () => {
    expect(ByteUtil.petabytes(1).toMegabits()).toBe(8000000000);
  });

  it('toGigabits coverts to gigabits', () => {
    expect(ByteUtil.petabytes(1).toGigabits()).toBe(8000000);
  });

  it('toTerabits coverts to terabits', () => {
    expect(ByteUtil.petabytes(1).toTerabits()).toBe(8000);
  });

  it('toPetabits coverts to petabits', () => {
    expect(ByteUtil.petabytes(1).toPetabits()).toBe(8);
  });

  it('toExabits coverts to exabits', () => {
    expect(ByteUtil.petabytes(1).toExabits()).toBe(0.008);
  });

  it('toZettabits coverts to zettabits', () => {
    expect(ByteUtil.petabytes(1).toZettabits()).toBe(0.000008);
  });

  it('toYottabits coverts to yottabits', () => {
    expect(ByteUtil.petabytes(1).toYottabits()).toBe(0.000000008);
  });

  it('toKibibits coverts to kibibits', () => {
    expect(ByteUtil.petabytes(1).toKibibits()).toBe(7812500000000);
  });

  it('toMebibits coverts to mebibits', () => {
    expect(ByteUtil.petabytes(1).toMebibits()).toBe(7629394531.25);
  });

  it('toGibibits coverts to gibibits', () => {
    expect(ByteUtil.petabytes(1).toGibibits()).toBe(7450580.596923828);
  });

  it('toTebibits coverts to tebibits', () => {
    expect(ByteUtil.petabytes(1).toTebibits()).toBe(7275.957614183426);
  });

  it('toPebibits coverts to pebibits', () => {
    expect(ByteUtil.petabytes(1).toPebibits()).toBe(7.105427357601002);
  });

  it('toExbibits coverts to exbibits', () => {
    expect(ByteUtil.petabytes(1).toExbibits()).toBe(0.006938893903907228);
  });

  it('toZebibits coverts to zebibits', () => {
    expect(ByteUtil.petabytes(1).toZebibits()).toBe(0.0000067762635780344);
  });

  it('toYobibits coverts to yobibits', () => {
    expect(ByteUtil.petabytes(1000).toYobibits()).toBe(0.00000661744490042422);
  });

  it('toBytes coverts to bytes', () => {
    expect(ByteUtil.petabytes(1).toBytes()).toBe(1000000000000000);
  });

  it('toKilobytes coverts to kilobytes', () => {
    expect(ByteUtil.petabytes(1).toKilobytes()).toBe(1000000000000);
  });

  it('toMegabytes coverts to megabytes', () => {
    expect(ByteUtil.petabytes(1).toMegabytes()).toBe(1000000000);
  });

  it('toGigabytes coverts to gigabytes', () => {
    expect(ByteUtil.petabytes(1).toGigabytes()).toBe(1000000);
  });

  it('toTerabytes coverts to terabytes', () => {
    expect(ByteUtil.petabytes(1).toTerabytes()).toBe(1000);
  });

  it('toPetabytes coverts to petabytes', () => {
    expect(ByteUtil.petabytes(1).toPetabytes()).toBe(1);
  });

  it('toExabytes coverts to exabytes', () => {
    expect(ByteUtil.petabytes(1).toExabytes()).toBe(0.001);
  });

  it('toZettabytes coverts to zettabytes', () => {
    expect(ByteUtil.petabytes(1).toZettabytes()).toBe(0.000001);
  });

  it('toYottabytes coverts to yottabytes', () => {
    expect(ByteUtil.petabytes(1).toYottabytes()).toBe(0.000000001);
  });

  it('toKibibytes coverts to kibibytes', () => {
    expect(ByteUtil.petabytes(1).toKibibytes()).toBe(976562500000);
  });

  it('toMebibytes coverts to mebibytes', () => {
    expect(ByteUtil.petabytes(1).toMebibytes()).toBe(953674316.40625);
  });

  it('toGibibytes coverts to gibibytes', () => {
    expect(ByteUtil.petabytes(1).toGibibytes()).toBe(931322.5746154785);
  });

  it('toTebibytes coverts to tebibytes', () => {
    expect(ByteUtil.petabytes(1).toTebibytes()).toBe(909.4947017729282);
  });

  it('toPebibytes coverts to pebibytes', () => {
    expect(ByteUtil.petabytes(1).toPebibytes()).toBe(0.8881784197001252);
  });

  it('toExbibytes coverts to exbibytes', () => {
    expect(ByteUtil.petabytes(1).toExbibytes()).toBe(0.0008673617379884035);
  });

  it('toZebibytes coverts to zebibytes', () => {
    expect(ByteUtil.petabytes(1000).toZebibytes()).toBe(0.0008470329472543003);
  });

  it('toYobibytes coverts to yobibytes', () => {
    expect(ByteUtil.petabytes(1000000).toYobibytes()).toBe(0.0008271806125530277);
  });
});
