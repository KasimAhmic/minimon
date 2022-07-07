import { Settings, ThemeMode } from '@ahmic/minimon-core';
import { IsBoolean, IsEnum } from 'class-validator';

export class SettingsDto implements Settings {
  @IsBoolean()
  clickToReload: boolean;

  @IsBoolean()
  showDebugScreen: boolean;

  @IsEnum(ThemeMode)
  themeMode: ThemeMode;
}
