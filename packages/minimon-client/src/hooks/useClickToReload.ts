import { RefObject, useEffect } from 'react';
import { useSettingsSelector } from './useSettingsSelector';

const reload = () => window.location.reload();

export const useClickToReload = (rootRef: RefObject<HTMLElement>): void => {
  const clickToReloadEnabled = useSettingsSelector((settings) => settings.clickToReload);

  useEffect(() => {
    if (!rootRef.current) return;

    const element = rootRef.current;

    if (clickToReloadEnabled) element.addEventListener('click', reload);

    return () => element.removeEventListener('click', reload);
  }, [rootRef, clickToReloadEnabled]);
};
