import { useEffect } from 'react';

export const useDebug = () => {
  const debugEnabled = window.location.search.includes('debug');

  useEffect(() => {
    if (!debugEnabled) return;

    const body = document.querySelector('body');

    body?.addEventListener('click', () => window.location.reload());

    return () => body?.removeEventListener('click', () => window.location.reload());
  }, [debugEnabled]);
};
