import { MinimonEvent } from '../events/minimon.event';
import { ISettingsEvent } from '@ahmic/minimon-core';

export class SettingsEvent extends MinimonEvent<ISettingsEvent> {
  readonly data: boolean;

  constructor() {
    super('settings');
    this.data = true;
  }
}
