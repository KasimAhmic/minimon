import { MinimonEvent } from '../events/minimon.event';
import { ISettingsEvent, Settings } from '@ahmic/minimon-core';

export class SettingsEvent extends MinimonEvent<ISettingsEvent> {
  readonly data: Settings;

  constructor(settings: Settings) {
    super('settings');
    this.data = settings;
  }
}
