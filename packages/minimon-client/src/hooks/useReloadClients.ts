import { useCallback } from 'react';
import { useReloadClientsMutation } from 'services/minimon.service';

export const useReloadClients = () => {
  const [reloadClients, reloadClientsStatus] = useReloadClientsMutation();

  const callback = useCallback(() => reloadClients(), [reloadClients]);

  return [callback, reloadClientsStatus] as const;
};
