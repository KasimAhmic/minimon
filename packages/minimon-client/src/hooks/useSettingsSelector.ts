import { defaultSettings, Settings } from '@ahmic/minimon-core';
import { minimonServiceEndpoints } from '../services/minimon.service';

type SelectFromResult = (data: Settings) => any;
type Result = { data?: Settings };

export const useSettingsSelector = <T extends SelectFromResult>(selector: T): ReturnType<T> => {
  const selectFromResult = ({ data }: Result) => ({ data: selector?.(data ?? defaultSettings) });

  const { data } = minimonServiceEndpoints.getSettings.useQueryState(undefined, { selectFromResult });

  return data;
};

export const useAreSettingsLoaded = () => {
  const { isSuccess } = minimonServiceEndpoints.getSettings.useQueryState(undefined);

  return isSuccess;
};
