import { SystemVitals } from '@ahmic/minimon-core';
import { useMemo } from 'react';
import { normalizeToPercentage } from 'util/number.util';
import { useVitalsSelector } from './useVitalsSelector';

export type SystemVitalsSelector = (vitals: SystemVitals) => number;

type VitalPercentage = { normalizedValue: number; formattedValue: string };

export const useVitalPercentage = (
  value: number | SystemVitalsSelector,
  min: number | SystemVitalsSelector,
  max: number | SystemVitalsSelector,
  normalize: boolean = false,
  suffix: string = '%',
): VitalPercentage => {
  const currentValue = useVitalsSelector((vitals) => (typeof value === 'number' ? value : value(vitals)));
  const minValue = useVitalsSelector((vitals) => (typeof min === 'number' ? min : min(vitals)));
  const maxValue = useVitalsSelector((vitals) => (typeof max === 'number' ? max : max(vitals)));

  const normalizedValue = useMemo<number>(
    () => (normalize ? normalizeToPercentage(currentValue, [minValue, maxValue], [0, 70]) : currentValue),
    [currentValue, maxValue, minValue, normalize],
  );

  const formattedValue = currentValue.toFixed(2) + suffix;

  return { normalizedValue, formattedValue };
};
