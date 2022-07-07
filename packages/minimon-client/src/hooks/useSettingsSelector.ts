import { defaultSettings, Settings } from '@ahmic/minimon-core';
import { minimonServiceEndpoints } from '../services/minimon.service';

type SelectFromResult = (data: Settings) => any;
type Result = { data?: Settings };

export const useSettingsSelector = <T extends SelectFromResult>(selector: T): ReturnType<T> => {
  const selectFromResult = ({ data }: Result) => ({ data: selector?.(data ?? defaultSettings) });

  const { data } = minimonServiceEndpoints.settings.useQueryState(undefined, { selectFromResult });

  return data;
};
