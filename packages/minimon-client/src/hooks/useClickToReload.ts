import { RefObject, useEffect } from 'react';
import { useSettingsSelector } from './useSettingsSelector';

export const useClickToReload = (rootRef: RefObject<HTMLElement>): void => {
  const clickToReloadEnabled = useSettingsSelector((settings) => settings.clickToReload);

  useEffect(() => {
    if (!rootRef.current || !clickToReloadEnabled) return;

    const element = rootRef.current;

    element.addEventListener('click', () => window.location.reload());

    return () => element.removeEventListener('click', () => window.location.reload());
  }, [rootRef, clickToReloadEnabled]);
};
