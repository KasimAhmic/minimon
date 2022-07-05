import { SystemStats } from '@ahmic/minimon-core';
import { useMemo } from 'react';
import { normalizeToPercentage } from 'util/number.util';
import { useStatsSelector } from './useStatsSelector';

export type SystemStatsSelector = (stats: SystemStats) => number;

type StatPercentage = { normalizedValue: number; formattedValue: string };

export const useStatPercentage = (
  value: number | SystemStatsSelector,
  min: number | SystemStatsSelector,
  max: number | SystemStatsSelector,
  normalize: boolean = false,
): StatPercentage => {
  const currentValue = useStatsSelector((stats) => (typeof value === 'number' ? value : value(stats)));
  const minValue = useStatsSelector((stats) => (typeof min === 'number' ? min : min(stats)));
  const maxValue = useStatsSelector((stats) => (typeof max === 'number' ? max : max(stats)));

  const normalizedValue = useMemo<number>(
    () => (normalize ? normalizeToPercentage(currentValue, [minValue, maxValue], [0, 75]) : currentValue),
    [currentValue, maxValue, minValue, normalize],
  );

  const formattedValue = currentValue.toFixed(2) + '%';

  return { normalizedValue, formattedValue };
};
