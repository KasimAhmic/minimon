import { useEffect } from 'react';
import { baseUrl } from 'services/minimon.service';
import { minimonStream } from 'services/minimon.stream';

export const useMinimonStream = () => {
  useEffect(() => {
    minimonStream.connect(`${baseUrl}/events`);

    return () => minimonStream.disconnect();
  }, []);
};
