import { useMinimonStream } from 'hooks';
import { FC } from 'react';
import { useGetVitalsQuery, useGetSettingsQuery } from '../services/minimon.service';

export const DataProvider: FC = () => {
  useGetVitalsQuery();
  useGetSettingsQuery();
  useMinimonStream();

  return null;
};
