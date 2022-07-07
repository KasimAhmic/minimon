import { Body, Controller, Get, Put } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Settings } from '@ahmic/minimon-core';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getSettings(): Settings {
    return this.settingsService.getSettings();
  }

  @Put()
  updateSettings(@Body() updateSettingsDto: UpdateSettingsDto): Settings {
    return this.settingsService.updateSettings(updateSettingsDto);
  }

  @Put('reset')
  resetSettings(): Settings {
    return this.settingsService.resetSettings();
  }
}
