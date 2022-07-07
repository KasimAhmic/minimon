export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface Settings {
  clickToReload: boolean;
  showDebugScreen: boolean;
  themeMode: ThemeMode;
}

export const defaultSettings: Settings = {
  clickToReload: true,
  showDebugScreen: true,
  themeMode: ThemeMode.DARK,
};
