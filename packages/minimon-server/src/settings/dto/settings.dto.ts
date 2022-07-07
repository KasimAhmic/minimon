import { Settings, ThemeMode } from '@ahmic/minimon-core';
import { IsBoolean, IsString } from 'class-validator';

export class SettingsDto implements Settings {
  @IsBoolean()
  clickToReload: boolean;

  @IsBoolean()
  showDebugScreen: boolean;

  @IsString()
  themeMode: ThemeMode;
}
