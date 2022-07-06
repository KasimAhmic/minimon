import { IMinimonEvent } from '@ahmic/minimon-core';

export abstract class MinimonEvent<T extends IMinimonEvent = IMinimonEvent> {
  readonly type: T['type'];
  readonly created: number;
  abstract readonly data: T['data'];

  protected constructor(type: T['type']) {
    this.type = type;
    this.created = Date.now();
  }
}
