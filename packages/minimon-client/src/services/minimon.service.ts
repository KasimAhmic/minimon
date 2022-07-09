import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { ISettingsEvent, IVitalsEvent, Settings, SystemVitals } from '@ahmic/minimon-core';
import { minimonStream } from './minimon.stream';

export const baseUrl = '/api';

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl,
  }),
);

const noRetry = { extraOptions: { maxRetries: 0 } };

const minimonService = createApi({
  reducerPath: 'minimon',
  baseQuery,
  endpoints: (build) => ({
    getVitals: build.query<VitalsResponse, VitalsArgs>({
      query: () => ({
        url: '/vitals',
      }),
      onCacheEntryAdded: async (_, { updateCachedData, cacheEntryRemoved }) => {
        const id = minimonStream.subscribe<IVitalsEvent>('vitals', (vitals) => {
          updateCachedData(() => vitals);
        });

        await cacheEntryRemoved;

        minimonStream.unsubscribe('vitals', id);
      },
    }),

    getSettings: build.query<GetSettingsResponse, GetSettingsArgs>({
      query: () => ({
        url: '/settings',
      }),
      onCacheEntryAdded: async (_, { updateCachedData, cacheEntryRemoved }) => {
        const settingsSubscription = minimonStream.subscribe<ISettingsEvent>('settings', (settings) => {
          updateCachedData(() => settings);
        });

        await cacheEntryRemoved;

        minimonStream.unsubscribe('settings', settingsSubscription);
      },
    }),

    updateSettings: build.mutation<UpdateSettingsResponse, UpdateSettingsArgs>({
      query: (settings) => ({
        url: '/settings',
        method: 'PUT',
        body: settings,
      }),
      ...noRetry,
    }),

    resetSettings: build.mutation<ResetSettingsResponse, ResetSettingsArgs>({
      query: () => ({
        url: '/settings/reset',
        method: 'PUT',
      }),
      ...noRetry,
    }),

    reloadClients: build.mutation<ReloadClientsResponse, ReloadClientsArgs>({
      query: () => ({
        url: '/settings/reload',
        method: 'PUT',
      }),
      ...noRetry,
    }),
  }),
});

export type VitalsResponse = SystemVitals;
export type VitalsArgs = void;
export type GetSettingsResponse = Settings;
export type GetSettingsArgs = void;
export type UpdateSettingsResponse = Settings;
export type UpdateSettingsArgs = Partial<Settings>;
export type ResetSettingsResponse = void;
export type ResetSettingsArgs = void;
export type ReloadClientsResponse = void;
export type ReloadClientsArgs = void;

export const {
  useGetVitalsQuery,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
  useResetSettingsMutation,
  useReloadClientsMutation,
  reducerPath: minimonServiceReducerPath,
  reducer: minimonServiceReducer,
  endpoints: minimonServiceEndpoints,
  middleware: minimonServiceMiddleware,
} = minimonService;
