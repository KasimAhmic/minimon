import { IReloadEvent } from '@ahmic/minimon-core';
import { MinimonEvent } from './minimon.event';

describe('Minimon Event', () => {
  it('creates a new MinimonEvent object with the current timestamp', () => {
    const now = Date.now();

    class MockReloadEvent extends MinimonEvent<IReloadEvent> {
      readonly data: boolean;

      constructor() {
        super('reload');
        this.data = true;
      }
    }

    const event = new MockReloadEvent();

    expect(event.created).toBeGreaterThanOrEqual(now);
    expect(event.type).toBe('reload');
    expect(event.data).toBe(true);
  });
});
