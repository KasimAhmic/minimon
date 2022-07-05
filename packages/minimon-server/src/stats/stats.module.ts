import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PiMonConfig } from 'src/common/config.schema';
import { DEFAULT_NETWORK_INTERFACE } from './stats.constants';
import { StatsService } from './stats.service';
import * as si from 'systeminformation';
import { SchedulerRegistry } from '@nestjs/schedule';
import { StatsController } from './stats.controller';
import { networkInterfaceProvider } from './network-interface.provider';
import { platform } from 'os';

@Module({
  imports: [ConfigModule],
  controllers: [StatsController],
  providers: [networkInterfaceProvider, StatsService],
  exports: [DEFAULT_NETWORK_INTERFACE],
})
export class StatsModule implements OnModuleInit {
  private readonly logger = new Logger(StatsModule.name);

  constructor(
    private readonly configService: ConfigService<PiMonConfig>,
    private readonly statsService: StatsService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async onModuleInit(): Promise<void> {
    if (platform() === 'win32') {
      si.powerShellStart();
    }

    await this.statsService.updateStats();

    const job = setInterval(
      () => this.statsService.updateStats(),
      this.configService.get('POLLING_INTERVAL'),
    );

    this.schedulerRegistry.addInterval('Stats Job', job);
  }
}
