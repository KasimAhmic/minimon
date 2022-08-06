import { Inject, Injectable } from '@nestjs/common';
import { Settings, defaultSettings } from '@ahmic/minimon-core';
import { EventsService } from '../events/events.service';
import { SettingsEvent } from './settings.event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { INTERVAL_UPDATED, SETTINGS_FILE } from './settings.constants';
import { ReloadEvent } from './reload.event';
import { PersistenceService } from '../persistence/persistence.service';

@Injectable()
export class SettingsService {
  private settings: Settings;

  constructor(
    private readonly eventsService: EventsService,
    private readonly eventEmitter: EventEmitter2,
    @Inject(SETTINGS_FILE)
    private readonly userSettings: Settings,
    private readonly persistenceService: PersistenceService<Settings>,
  ) {
    this.settings = this.userSettings;
  }

  async getSettings(): Promise<Settings> {
    return this.settings;
  }

  private setSettings(settings: Partial<Settings>): Settings {
    this.settings = { ...this.settings, ...settings };

    this.eventsService.emitEvent(new SettingsEvent(this.settings));

    this.persistenceService.write(JSON.stringify(this.settings, null, 2));

    return this.settings;
  }

  updateSettings(settings: Partial<Settings>): Settings {
    this.handlePollingIntervalUpdate(settings);

    return this.setSettings(settings);
  }

  resetSettings(): Settings {
    this.handlePollingIntervalUpdate(defaultSettings);

    return this.setSettings(defaultSettings);
  }

  reloadClients(): void {
    this.eventsService.emitEvent(new ReloadEvent());
  }

  private handlePollingIntervalUpdate(settings: Partial<Settings>) {
    if (settings?.pollingInterval && this.settings.pollingInterval !== settings.pollingInterval) {
      this.eventEmitter.emit(INTERVAL_UPDATED, settings.pollingInterval);
    }
  }
}
