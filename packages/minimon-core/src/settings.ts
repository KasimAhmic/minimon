import { defaultLayout, Layout } from './layout';

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface Settings {
  clickToReload: boolean;
  showDebugScreen: boolean;
  themeMode: ThemeMode;
  pollingInterval: number;
  layout: Layout;
}

export const defaultSettings: Settings = {
  clickToReload: true,
  showDebugScreen: false,
  themeMode: ThemeMode.LIGHT,
  pollingInterval: 1000,
  layout: defaultLayout,
};
