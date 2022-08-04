type Range = [number, number];

/**
 * @description
 *
 * @param value Value to rescale
 * @param valueRange Range the value initially falls in
 * @param targetRange Range to normalize the value to
 *
 * @returns
 */
export const rescale = (value: number, valueRange: Range, targetRange: Range): number => {
  const [valueRangeMin, valueRangeMax] = valueRange;
  const [targetRangeMin, targetRangeMax] = targetRange;

  return (
    ((value - valueRangeMin) * (targetRangeMax - targetRangeMin)) / (valueRangeMax - valueRangeMin) +
    targetRangeMin
  );
};

export const round = (
  value: number,
  decimalPlaces: number,
  parser: typeof parseInt | typeof parseFloat,
): number => parser(value.toFixed(decimalPlaces));

export const roundFloat = (value: number, decimalPlaces = 2) => round(value, decimalPlaces, parseFloat);

export const roundInt = (value: number) => round(value, 0, parseInt);
