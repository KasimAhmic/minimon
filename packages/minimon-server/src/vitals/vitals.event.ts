import { MinimonEvent } from '../events/minimon.event';
import { IVitalsEvent, SystemVitals } from '@ahmic/minimon-core';

export class VitalsEvent extends MinimonEvent<IVitalsEvent> {
  readonly data: SystemVitals;

  constructor(vitals: SystemVitals) {
    super('vitals');
    this.data = vitals;
  }
}
