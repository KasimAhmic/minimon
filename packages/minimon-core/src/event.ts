import { SystemStats } from './system.stats';

export interface IMinimonEvent<T extends string = string, D = unknown> {
  type: T;
  created: number;
  data: D;
}

export type IStatsEvent = IMinimonEvent<'stats', SystemStats>;
export type IReloadEvent = IMinimonEvent<'reload', boolean>;
export type ISettingsEvent = IMinimonEvent<'settings', any>;
