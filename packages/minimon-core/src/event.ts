import { Settings } from './settings';
import { SystemVitals } from './system-vitals';

export interface IMinimonEvent<T extends string = string, D = unknown> {
  type: T;
  created: number;
  data: D;
}

export type IVitalsEvent = IMinimonEvent<'vitals', SystemVitals>;
export type IReloadEvent = IMinimonEvent<'reload', boolean>;
export type ISettingsEvent = IMinimonEvent<'settings', Settings>;
