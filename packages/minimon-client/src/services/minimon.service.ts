import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { ISettingsEvent, IStatsEvent, SystemStats } from '@ahmic/minimon-core';
import { minimonStream } from './minimon.stream';

export const baseUrl = '/api';

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl,
  }),
);

const minimonService = createApi({
  reducerPath: 'minimon',
  baseQuery,
  endpoints: (build) => ({
    stats: build.query<StatsResponse, StatsArgs>({
      query: () => ({
        url: '/stats',
      }),
      onCacheEntryAdded: async (_, { updateCachedData, cacheEntryRemoved }) => {
        const id = minimonStream.subscribe<IStatsEvent>('stats', (stats) => {
          updateCachedData(() => stats);
        });

        await cacheEntryRemoved;

        minimonStream.unsubscribe('stats', id);
      },
    }),

    settings: build.query<any, void>({
      query: () => ({
        url: '/settings',
      }),
      onCacheEntryAdded: async (_, { updateCachedData, cacheEntryRemoved }) => {
        const settingsSubscription = minimonStream.subscribe<ISettingsEvent>('settings', (settings) => {
          updateCachedData(() => settings);
        });

        await cacheEntryRemoved;

        minimonStream.unsubscribe('stats', settingsSubscription);
      },
    }),
  }),
});

export type StatsResponse = SystemStats;
export type StatsArgs = void;

export const {
  useStatsQuery,
  reducerPath: minimonServiceReducerPath,
  reducer: minimonServiceReducer,
  endpoints: minimonServiceEndpoints,
  middleware: minimonServiceMiddleware,
} = minimonService;
