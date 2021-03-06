import { defaultSettings } from '@ahmic/minimon-core';
import { GetSettingsResponse, minimonServiceEndpoints } from '../services/minimon.service';

type SelectFromResult = (data: GetSettingsResponse) => any;
type Result = { data?: GetSettingsResponse };

export const useSettingsSelector = <T extends SelectFromResult>(selector: T): ReturnType<T> => {
  const selectFromResult = ({ data }: Result) => ({ data: selector?.(data ?? defaultSettings) });

  const { data } = minimonServiceEndpoints.getSettings.useQueryState(undefined, { selectFromResult });

  return data;
};

export const useAreSettingsLoaded = (): boolean => {
  const { isSuccess } = minimonServiceEndpoints.getSettings.useQueryState(undefined);

  return isSuccess;
};
