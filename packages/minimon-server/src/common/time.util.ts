export const timed = async (timedFunction: () => Promise<void>): Promise<string> => {
  const start = process.hrtime.bigint();

  await timedFunction();

  const end = process.hrtime.bigint();

  return (Number(end - start) / 1e6).toFixed(3) + ' ms';
};
