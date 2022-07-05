import { SystemStats } from '@ahmic/minimon-core';
import { Controller, Get, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { StatsService, SystemStatsMessage } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly appService: StatsService) {}

  @Get()
  currentStats(): SystemStats {
    return this.appService.getStats();
  }

  @Sse('stream')
  streamStats(): Observable<SystemStatsMessage> {
    return this.appService.subscribe();
  }
}
