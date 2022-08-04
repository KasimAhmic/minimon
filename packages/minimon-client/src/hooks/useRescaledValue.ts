import { SystemVitals, VitalsData, rescale } from '@ahmic/minimon-core';
import { useMemo } from 'react';
import { useVitalsSelector } from './useVitalsSelector';

export type SystemVitalsSelector = (vitals: SystemVitals) => VitalsData;

export const useRescaledValue = (
  selector: SystemVitalsSelector,
): { rescaledValue: number; valueLabel: string } => {
  const { currentValue, minValue, maxValue, label } = useVitalsSelector(selector);

  const rescaledValue = useMemo<number>(
    () => rescale(currentValue, [minValue, maxValue], [0, 70]),
    [currentValue, maxValue, minValue],
  );

  return { rescaledValue, valueLabel: label };
};
