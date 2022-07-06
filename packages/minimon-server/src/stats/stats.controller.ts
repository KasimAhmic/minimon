import { SystemStats } from '@ahmic/minimon-core';
import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly appService: StatsService) {}

  @Get()
  currentStats(): SystemStats {
    return this.appService.getStats();
  }
}
