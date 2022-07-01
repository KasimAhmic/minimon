import { defaultSystemStats, SystemStats } from '@ahmic/minimon-core';
import { minimonServiceEndpoints } from '../services/minimon.service';

type SelectFromResult = (data: SystemStats) => any;
type Result = { data?: SystemStats };

export const useStatsSelector = <T extends SelectFromResult>(selector: T): ReturnType<T> => {
  const selectFromResult = ({ data }: Result) => ({ data: selector?.(data ?? defaultSystemStats) });

  const { data } = minimonServiceEndpoints.stats.useQueryState(undefined, { selectFromResult });

  return data;
};
