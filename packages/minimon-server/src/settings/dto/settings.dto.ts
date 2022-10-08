import { Layout, MinimonTheme, Settings, ThemeMode } from '@ahmic/minimon-core';
import { IsBoolean, IsEnum, IsInt, IsObject, IsPositive } from 'class-validator';

export class SettingsDto implements Settings {
  @IsBoolean()
  clickToReload: boolean;

  @IsBoolean()
  showDebugScreen: boolean;

  @IsEnum(ThemeMode)
  themeMode: ThemeMode;

  @IsInt()
  @IsPositive()
  pollingInterval: number;

  // TODO: Enhance this
  @IsObject()
  layout: Layout;

  // TODO: Enhance this
  @IsObject()
  theme: MinimonTheme;
}
