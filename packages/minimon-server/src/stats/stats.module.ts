import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DEFAULT_NETWORK_INTERFACE } from './stats.constants';
import { StatsService } from './stats.service';
import * as si from 'systeminformation';
import { StatsController } from './stats.controller';
import { networkInterfaceProvider } from './network-interface.provider';
import { platform } from 'os';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [ConfigModule, EventsModule],
  controllers: [StatsController],
  providers: [networkInterfaceProvider, StatsService],
  exports: [DEFAULT_NETWORK_INTERFACE],
})
export class StatsModule implements OnModuleInit {
  private readonly logger = new Logger(StatsModule.name);

  constructor(private readonly statsService: StatsService) {}

  async onModuleInit(): Promise<void> {
    if (platform() === 'win32') {
      si.powerShellStart();
    }

    await this.statsService.updateStats();

    await this.statsService.startPoller(1000);
  }
}
