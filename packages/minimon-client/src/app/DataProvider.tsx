import { useMinimonStream } from 'hooks/useMinimonStream';
import { FC } from 'react';
import { useStatsQuery } from '../services/minimon.service';

export const DataProvider: FC = () => {
  useStatsQuery();
  useMinimonStream();

  return null;
};
