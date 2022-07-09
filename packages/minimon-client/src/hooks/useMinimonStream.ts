import { IStatsEvent } from '@ahmic/minimon-core';
import { useAppDispatch } from 'app/hooks';
import { useCallback, useEffect } from 'react';
import { baseUrl } from 'services/minimon.service';
import { minimonStream } from 'services/minimon.stream';
import { event, message, log } from 'slices';

export const useMinimonStream = () => {
  const dispatch = useAppDispatch();

  const onConnect = useCallback(() => dispatch(event('connect')), [dispatch]);

  const onError = useCallback(() => dispatch(event('error')), [dispatch]);

  const onMessage = useCallback(
    (e: MessageEvent) => {
      const data: IStatsEvent = JSON.parse(e.data);

      dispatch(message(data));
      dispatch(log(`${data.created} ${data.type}`));
    },
    [dispatch],
  );

  useEffect(() => {
    minimonStream.connect(`${baseUrl}/events`, { onConnect, onMessage, onError });

    return () => minimonStream.disconnect();
  }, [onConnect, onMessage, onError]);
};
