type TimedResult<T> = [T, number];

export const timed = async <T = unknown>(timedFunction: () => Promise<T>): Promise<TimedResult<T>> => {
  const start = process.hrtime.bigint();

  const result = await timedFunction();

  const end = process.hrtime.bigint();

  return [result, Number(end - start) / 1e6];
};

export const toMillis = (milliseconds: number): string => milliseconds.toFixed(3) + ' ms';
