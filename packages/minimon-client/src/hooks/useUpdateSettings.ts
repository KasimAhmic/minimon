import { Settings } from '@ahmic/minimon-core';
import { useCallback } from 'react';
import { useUpdateSettingsMutation } from 'services/minimon.service';

export const useUpdateSettings = () => {
  const [updateSettings, updateSettingsStatus] = useUpdateSettingsMutation();

  const callback = useCallback((settings: Partial<Settings>) => updateSettings(settings), [updateSettings]);

  return [callback, updateSettingsStatus] as const;
};
