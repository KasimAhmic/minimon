import { FC } from 'react';
import { useStatsQuery } from '../services/minimon.service';

export const DataProvider: FC = () => {
  useStatsQuery();

  return null;
};
