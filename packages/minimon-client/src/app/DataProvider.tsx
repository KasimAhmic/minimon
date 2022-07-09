import { useMinimonStream } from 'hooks';
import { FC } from 'react';
import { useStatsQuery, useGetSettingsQuery } from '../services/minimon.service';

export const DataProvider: FC = () => {
  useStatsQuery();
  useGetSettingsQuery();
  useMinimonStream();

  return null;
};
