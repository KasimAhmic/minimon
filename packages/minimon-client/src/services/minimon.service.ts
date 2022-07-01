import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { SystemStats } from '@ahmic/minimon-core';

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
        const eventsource = new EventSource(`${baseUrl}/stats/stream`);

        eventsource.onmessage = ({ data }) => {
          updateCachedData(() => JSON.parse(data));
        };

        await cacheEntryRemoved;

        try {
          eventsource.close();
        } catch {}
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
