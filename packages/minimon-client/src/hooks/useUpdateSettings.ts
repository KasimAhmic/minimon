import { useCallback } from 'react';
import { useUpdateSettingsMutation, UpdateSettingsArgs } from 'services/minimon.service';

export const useUpdateSettings = () => {
  const [updateSettings, updateSettingsStatus] = useUpdateSettingsMutation();

  const callback = useCallback((settings: UpdateSettingsArgs) => updateSettings(settings), [updateSettings]);

  return [callback, updateSettingsStatus] as const;
};
