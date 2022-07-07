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
}
