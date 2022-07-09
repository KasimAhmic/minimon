import { defaultSystemVitals } from '@ahmic/minimon-core';
import { minimonServiceEndpoints, VitalsResponse } from '../services/minimon.service';

type SelectFromResult = (data: VitalsResponse) => any;
type Result = { data?: VitalsResponse };

export const useVitalsSelector = <T extends SelectFromResult>(selector: T): ReturnType<T> => {
  const selectFromResult = ({ data }: Result) => ({ data: selector?.(data ?? defaultSystemVitals) });

  const { data } = minimonServiceEndpoints.getVitals.useQueryState(undefined, { selectFromResult });

  return data;
};
