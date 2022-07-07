import { Controller, Get } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Settings } from '@ahmic/minimon-core';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getSettings(): Settings {
    return this.settingsService.getSettings();
  }
}
