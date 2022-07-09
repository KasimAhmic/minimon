type TimedResult<T> = [T, number];

/**
 * Utility function to time how long a function takes to execute.
 *
 * @param timedFunction Function to time
 *
 * @returns An array containing the result of the `timedFunction` and the execution time of the function in milliseconds.
 */
export const timed = async <T = unknown>(timedFunction: () => T | Promise<T>): Promise<TimedResult<T>> => {
  const start = process.hrtime.bigint();

  const result = await timedFunction();

  const end = process.hrtime.bigint();

  return [result, Number(end - start) / 1e6];
};

/**
 * Utility function to convert a numerical `milliseconds` value to a string with three decimal places.
 *
 * @param milliseconds Milliseconds
 *
 * @returns String representation of the `milliseconds` rounded to 3 decimal places.
 */
export const toMillis = (milliseconds: number): string => milliseconds.toFixed(3) + ' ms';
