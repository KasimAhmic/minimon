import { Injectable } from '@nestjs/common';
import { Settings, defaultSettings } from '@ahmic/minimon-core';
import { EventsService } from 'src/events/events.service';
import { SettingsEvent } from './settings.event';

@Injectable()
export class SettingsService {
  private settings: Settings;

  constructor(private readonly eventsService: EventsService) {
    this.settings = defaultSettings;
  }

  getSettings(): Settings {
    return this.settings;
  }

  private setSettings(settings: Partial<Settings>): Settings {
    this.settings = { ...this.settings, ...settings };

    this.eventsService.emitEvent(new SettingsEvent(this.settings));

    return this.settings;
  }

  updateSettings(settings: Partial<Settings>): Settings {
    return this.setSettings(settings);
  }

  resetSettings(): Settings {
    return this.setSettings(defaultSettings);
  }
}
