import { Controller, Get, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService, SystemStatsMessage } from './app.service';
import { SystemStats } from '@ahmic/minimon-core';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('stats')
  currentStats(): SystemStats {
    return this.appService.getStats();
  }

  @Sse('stats/stream')
  streamStats(): Observable<SystemStatsMessage> {
    return this.appService.subscribe();
  }
}
