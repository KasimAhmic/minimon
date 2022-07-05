type Range = [number, number];

/**
 * @description
 *
 * @param value Value to normalize
 * @param valueRange Range the value initially falls in
 * @param targetRange Range to normalize the value to
 *
 * @returns
 */
export const normalizeToPercentage = (value: number, valueRange: Range, targetRange: Range): number => {
  const [valueRangeMin, valueRangeMax] = valueRange;
  const [targetRangeMin, targetRangeMax] = targetRange;

  return (
    ((value - valueRangeMin) * (targetRangeMax - targetRangeMin)) / (valueRangeMax - valueRangeMin) +
    targetRangeMin
  );
};

export const normalizeToValue = (value: number, valueRange: Range, targetRange: Range): number =>
  normalizeToPercentage(value, valueRange, targetRange) * targetRange[1];
