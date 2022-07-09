import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DEFAULT_NETWORK_INTERFACE } from './vitals.constants';
import { VitalsService } from './vitals.service';
import * as si from 'systeminformation';
import { VitalsController } from './vitals.controller';
import { networkInterfaceProvider } from './network-interface.provider';
import { platform } from 'os';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [ConfigModule, EventsModule],
  controllers: [VitalsController],
  providers: [networkInterfaceProvider, VitalsService],
  exports: [DEFAULT_NETWORK_INTERFACE],
})
export class VitalsModule implements OnModuleInit {
  private readonly logger = new Logger(VitalsModule.name);

  constructor(private readonly vitalsService: VitalsService) {}

  async onModuleInit(): Promise<void> {
    if (platform() === 'win32') {
      si.powerShellStart();
    }

    await this.vitalsService.updateVitals();

    await this.vitalsService.startPoller(1000);
  }
}
