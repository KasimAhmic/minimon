import { useMinimonStream } from 'hooks/useMinimonStream';
import { FC } from 'react';
import { useStatsQuery, useSettingsQuery } from '../services/minimon.service';

export const DataProvider: FC = () => {
  useStatsQuery();
  useSettingsQuery();
  useMinimonStream();

  return null;
};
