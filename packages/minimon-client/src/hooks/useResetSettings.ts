import { useCallback } from 'react';
import { useResetSettingsMutation } from 'services/minimon.service';

export const useResetSettings = () => {
  const [resetSettings, resetSettingsStatus] = useResetSettingsMutation();

  const callback = useCallback(() => resetSettings(), [resetSettings]);

  return [callback, resetSettingsStatus] as const;
};
