export type ThemeMode = 'light' | 'dark';

export interface Settings {
  clickToReload: boolean;
  showDebugScreen: boolean;
  themeMode: ThemeMode;
}

export const defaultSettings: Settings = {
  clickToReload: true,
  showDebugScreen: true,
  themeMode: 'dark',
};
