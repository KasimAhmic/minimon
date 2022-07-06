import { MinimonEvent } from '../events/minimon.event';
import { IReloadEvent } from '@ahmic/minimon-core';

export class ReloadEvent extends MinimonEvent<IReloadEvent> {
  readonly data: boolean;

  constructor() {
    super('reload');
    this.data = true;
  }
}
