import { IVitalsEvent, noop } from '@ahmic/minimon-core';
import { useAppDispatch } from 'app/hooks';
import { useCallback, useEffect } from 'react';
import { baseUrl } from 'services/minimon.service';
import { minimonStream } from 'services/minimon.stream';
import { event, message, log } from 'slices';
import { useSettingsSelector } from './useSettingsSelector';

// TODO: Re-evaluate this hook. Not 100% this is the best to handle conditionally firing off Redux
// actions but this is also a hook I expect few people to use so maybe it's not worth the effort to
// optimize/do it correctly.

const ifDebugEnabled = (enabled: boolean, callback: () => unknown) => {
  if (!enabled) return noop();

  return callback();
};

export const useMinimonStream = () => {
  const dispatch = useAppDispatch();

  const debugEnabled = useSettingsSelector((settings) => settings.showDebugScreen);

  const onConnect = useCallback(
    () => ifDebugEnabled(debugEnabled, () => dispatch(event('connect'))),
    [debugEnabled, dispatch],
  );

  const onError = useCallback(
    () => ifDebugEnabled(debugEnabled, () => dispatch(event('error'))),
    [debugEnabled, dispatch],
  );

  const onMessage = useCallback(
    (e: MessageEvent) => {
      const data: IVitalsEvent = JSON.parse(e.data);

      ifDebugEnabled(debugEnabled, () => dispatch(message(data)));
      ifDebugEnabled(debugEnabled, () => dispatch(log(`${data.created} ${data.type}`)));
    },
    [debugEnabled, dispatch],
  );

  useEffect(() => {
    minimonStream.connect(`${baseUrl}/events`);

    return () => minimonStream.disconnect();
  }, []);

  useEffect(() => {
    minimonStream.updateHandlers({ onConnect, onMessage, onError });
  }, [onConnect, onMessage, onError]);
};
