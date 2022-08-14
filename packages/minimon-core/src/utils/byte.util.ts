import { Big } from 'big.js';

// TODO: Investigate if converting to number is a good idea as a loss in precision occurs when converting
// especially large numbers.
//
// Option A: Return Big object. This will maintain the entire feature set we need at the cost of forcing the
//           use of Big objects everywhere else in the code.
//
// Option B: Return a bigint. This will limit the feature set by only allowing integer values with the
//           benefit of being able to just use the native bigint type everywhere else in the code.
//
// Option C: Do nothing. This is certainly the easiest option...
//
// Option D: Allow the user to pass an argument and choose the return type. Might be tricky in terms of
//           return types but should be doable.

export class ByteUtil {
  static readonly BITS_IN_BYTE = Big('8');

  static readonly BITS_IN_KILOBIT = Big('1000');
  static readonly BITS_IN_MEGABIT = Big('1000000');
  static readonly BITS_IN_GIGABIT = Big('1000000000');
  static readonly BITS_IN_TERABIT = Big('1000000000000');
  static readonly BITS_IN_PETABIT = Big('1000000000000000');
  static readonly BITS_IN_EXABIT = Big('1000000000000000000');
  static readonly BITS_IN_ZETTABIT = Big('1000000000000000000000');
  static readonly BITS_IN_YOTTABIT = Big('1000000000000000000000000');

  static readonly BITS_IN_KIBIBIT = Big('1024');
  static readonly BITS_IN_MEBIBIT = Big('1048576');
  static readonly BITS_IN_GIBIBIT = Big('1073741824');
  static readonly BITS_IN_TEBIBIT = Big('1099511627776');
  static readonly BITS_IN_PEBIBIT = Big('1125899906842624');
  static readonly BITS_IN_EXBIBIT = Big('1152921504606846976');
  static readonly BITS_IN_ZEBIBIT = Big('1180591620717411303424');
  static readonly BITS_IN_YOBIBIT = Big('1208925819614629174706176');

  static readonly BITS_IN_KILOBYTE = Big('8000');
  static readonly BITS_IN_MEGABYTE = Big('8000000');
  static readonly BITS_IN_GIGABYTE = Big('8000000000');
  static readonly BITS_IN_TERABYTE = Big('8000000000000');
  static readonly BITS_IN_PETABYTE = Big('8000000000000000');
  static readonly BITS_IN_EXABYTE = Big('8000000000000000000');
  static readonly BITS_IN_ZETTABYTE = Big('8000000000000000000000');
  static readonly BITS_IN_YOTTABYTE = Big('8000000000000000000000000');

  static readonly BITS_IN_KIBIBYTE = Big('8192');
  static readonly BITS_IN_MEBIBYTE = Big('8388608');
  static readonly BITS_IN_GIBIBYTE = Big('8589934592');
  static readonly BITS_IN_TEBIBYTE = Big('8796093022208');
  static readonly BITS_IN_PEBIBYTE = Big('9007199254740992');
  static readonly BITS_IN_EXBIBYTE = Big('9223372036854775808');
  static readonly BITS_IN_ZEBIBYTE = Big('9444732965739290427392');
  static readonly BITS_IN_YOBIBYTE = Big('9671406556917033397649408');

  static readonly BYTES_IN_KILOBIT = Big('125');
  static readonly BYTES_IN_MEGABIT = Big('125000');
  static readonly BYTES_IN_GIGABIT = Big('125000000');
  static readonly BYTES_IN_TERABIT = Big('125000000000');
  static readonly BYTES_IN_PETABIT = Big('125000000000000');
  static readonly BYTES_IN_EXABIT = Big('125000000000000000');
  static readonly BYTES_IN_ZETTABIT = Big('125000000000000000000');
  static readonly BYTES_IN_YOTTABIT = Big('125000000000000000000000');

  static readonly BYTES_IN_KIBIBIT = Big('128');
  static readonly BYTES_IN_MEBIBIT = Big('131072');
  static readonly BYTES_IN_GIBIBIT = Big('134217728');
  static readonly BYTES_IN_TEBIBIT = Big('137438953472');
  static readonly BYTES_IN_PEBIBIT = Big('140737488355328');
  static readonly BYTES_IN_EXBIBIT = Big('144115188075855872');
  static readonly BYTES_IN_ZEBIBIT = Big('147573952589676412928');
  static readonly BYTES_IN_YOBIBIT = Big('151115727451828646838272');

  static readonly BYTES_IN_KILOBYTE = Big('1000');
  static readonly BYTES_IN_MEGABYTE = Big('1000000');
  static readonly BYTES_IN_GIGABYTE = Big('1000000000');
  static readonly BYTES_IN_TERABYTE = Big('1000000000000');
  static readonly BYTES_IN_PETABYTE = Big('1000000000000000');
  static readonly BYTES_IN_EXABYTE = Big('1000000000000000000');
  static readonly BYTES_IN_ZETTABYTE = Big('1000000000000000000000');
  static readonly BYTES_IN_YOTTABYTE = Big('1000000000000000000000000');

  static readonly BYTES_IN_KIBIBYTE = Big('1024');
  static readonly BYTES_IN_MEBIBYTE = Big('1048576');
  static readonly BYTES_IN_GIBIBYTE = Big('1073741824');
  static readonly BYTES_IN_TEBIBYTE = Big('1099511627776');
  static readonly BYTES_IN_PEBIBYTE = Big('1125899906842624');
  static readonly BYTES_IN_EXBIBYTE = Big('1152921504606846976');
  static readonly BYTES_IN_ZEBIBYTE = Big('1180591620717411303424');
  static readonly BYTES_IN_YOBIBYTE = Big('1208925819614629174706176');

  private readonly _bits: Big;

  constructor(bits: number | Big) {
    this._bits = typeof bits === 'number' ? Big(bits) : bits;
  }

  static bits(bits: number): ByteUtil {
    return new ByteUtil(Big(bits));
  }

  static kilobits(kilobits: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_KILOBIT.times(kilobits));
  }

  static megabits(megabits: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_MEGABIT.times(megabits));
  }

  static gigabits(gigabits: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_GIGABIT.times(gigabits));
  }

  static terabits(terabits: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_TERABIT.times(terabits));
  }

  static petabits(petabits: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_PETABIT.times(petabits));
  }

  static exabits(exabits: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_EXABIT.times(exabits));
  }

  static zettabits(zettabits: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_ZETTABIT.times(zettabits));
  }

  static yottabits(yottabits: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_YOTTABIT.times(yottabits));
  }

  static kibibits(kibibits: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_KIBIBIT.times(kibibits));
  }

  static mebibits(mebibits: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_MEBIBIT.times(mebibits));
  }

  static gibibits(gibibits: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_GIBIBIT.times(gibibits));
  }

  static tebibits(tebibits: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_TEBIBIT.times(tebibits));
  }

  static pebibits(pebibits: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_PEBIBIT.times(pebibits));
  }

  static exbibits(exbibits: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_EXBIBIT.times(exbibits));
  }

  static zebibits(zebibits: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_ZEBIBIT.times(zebibits));
  }

  static yobibits(yobibits: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_YOBIBIT.times(yobibits));
  }

  static bytes(bytes: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_BYTE.times(bytes));
  }

  static kilobytes(kilobytes: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_KILOBYTE.times(kilobytes));
  }

  static megabytes(megabytes: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_MEGABYTE.times(megabytes));
  }

  static gigabytes(gigabytes: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_GIGABYTE.times(gigabytes));
  }

  static terabytes(terabytes: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_TERABYTE.times(terabytes));
  }

  static petabytes(petabytes: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_PETABYTE.times(petabytes));
  }

  static exabytes(exabytes: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_EXABYTE.times(exabytes));
  }

  static zettabytes(zettabytes: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_ZETTABYTE.times(zettabytes));
  }

  static yottabytes(yottabytes: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_YOTTABYTE.times(yottabytes));
  }

  static kibibytes(kibibytes: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_KIBIBYTE.times(kibibytes));
  }

  static mebibytes(mebibytes: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_MEBIBYTE.times(mebibytes));
  }

  static gibibytes(gibibytes: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_GIBIBYTE.times(gibibytes));
  }

  static tebibytes(tebibytes: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_TEBIBYTE.times(tebibytes));
  }

  static pebibytes(pebibytes: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_PEBIBYTE.times(pebibytes));
  }

  static exbibytes(exbibytes: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_EXBIBYTE.times(exbibytes));
  }

  static zebibytes(zebibytes: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_ZEBIBYTE.times(zebibytes));
  }

  static yobibytes(yobibytes: number): ByteUtil {
    return new ByteUtil(ByteUtil.BITS_IN_YOBIBYTE.times(yobibytes));
  }

  toBits(): number {
    return this._bits.toNumber();
  }

  toKilobits(): number {
    return this._bits.div(ByteUtil.BITS_IN_KILOBIT).toNumber();
  }

  toMegabits(): number {
    return this._bits.div(ByteUtil.BITS_IN_MEGABIT).toNumber();
  }

  toGigabits(): number {
    return this._bits.div(ByteUtil.BITS_IN_GIGABIT).toNumber();
  }

  toTerabits(): number {
    return this._bits.div(ByteUtil.BITS_IN_TERABIT).toNumber();
  }

  toPetabits(): number {
    return this._bits.div(ByteUtil.BITS_IN_PETABIT).toNumber();
  }

  toExabits(): number {
    return this._bits.div(ByteUtil.BITS_IN_EXABIT).toNumber();
  }

  toZettabits(): number {
    return this._bits.div(ByteUtil.BITS_IN_ZETTABIT).toNumber();
  }

  toYottabits(): number {
    return this._bits.div(ByteUtil.BITS_IN_YOTTABIT).toNumber();
  }

  toKibibits(): number {
    return this._bits.div(ByteUtil.BITS_IN_KIBIBIT).toNumber();
  }

  toMebibits(): number {
    return this._bits.div(ByteUtil.BITS_IN_MEBIBIT).toNumber();
  }

  toGibibits(): number {
    return this._bits.div(ByteUtil.BITS_IN_GIBIBIT).toNumber();
  }

  toTebibits(): number {
    return this._bits.div(ByteUtil.BITS_IN_TEBIBIT).toNumber();
  }

  toPebibits(): number {
    return this._bits.div(ByteUtil.BITS_IN_PEBIBIT).toNumber();
  }

  toExbibits(): number {
    return this._bits.div(ByteUtil.BITS_IN_EXBIBIT).toNumber();
  }

  toZebibits(): number {
    return this._bits.div(ByteUtil.BITS_IN_ZEBIBIT).toNumber();
  }

  toYobibits(): number {
    return this._bits.div(ByteUtil.BITS_IN_YOBIBIT).toNumber();
  }

  toBytes(): number {
    return this._bits.div(ByteUtil.BITS_IN_BYTE).toNumber();
  }

  toKilobytes(): number {
    return this._bits.div(ByteUtil.BITS_IN_KILOBYTE).toNumber();
  }

  toMegabytes(): number {
    return this._bits.div(ByteUtil.BITS_IN_MEGABYTE).toNumber();
  }

  toGigabytes(): number {
    return this._bits.div(ByteUtil.BITS_IN_GIGABYTE).toNumber();
  }

  toTerabytes(): number {
    return this._bits.div(ByteUtil.BITS_IN_TERABYTE).toNumber();
  }

  toPetabytes(): number {
    return this._bits.div(ByteUtil.BITS_IN_PETABYTE).toNumber();
  }

  toExabytes(): number {
    return this._bits.div(ByteUtil.BITS_IN_EXABYTE).toNumber();
  }

  toZettabytes(): number {
    return this._bits.div(ByteUtil.BITS_IN_ZETTABYTE).toNumber();
  }

  toYottabytes(): number {
    return this._bits.div(ByteUtil.BITS_IN_YOTTABYTE).toNumber();
  }

  toKibibytes(): number {
    return this._bits.div(ByteUtil.BITS_IN_KIBIBYTE).toNumber();
  }

  toMebibytes(): number {
    return this._bits.div(ByteUtil.BITS_IN_MEBIBYTE).toNumber();
  }

  toGibibytes(): number {
    return this._bits.div(ByteUtil.BITS_IN_GIBIBYTE).toNumber();
  }

  toTebibytes(): number {
    return this._bits.div(ByteUtil.BITS_IN_TEBIBYTE).toNumber();
  }

  toPebibytes(): number {
    return this._bits.div(ByteUtil.BITS_IN_PEBIBYTE).toNumber();
  }

  toExbibytes(): number {
    return this._bits.div(ByteUtil.BITS_IN_EXBIBYTE).toNumber();
  }

  toZebibytes(): number {
    return this._bits.div(ByteUtil.BITS_IN_ZEBIBYTE).toNumber();
  }

  toYobibytes(): number {
    return this._bits.div(ByteUtil.BITS_IN_YOBIBYTE).toNumber();
  }
}
