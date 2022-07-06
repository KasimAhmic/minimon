import { MinimonEvent } from '../events/minimon.event';
import { IStatsEvent, SystemStats } from '@ahmic/minimon-core';

export class StatsEvent extends MinimonEvent<IStatsEvent> {
  readonly data: SystemStats;

  constructor(stats: SystemStats) {
    super('stats');
    this.data = stats;
  }
}
