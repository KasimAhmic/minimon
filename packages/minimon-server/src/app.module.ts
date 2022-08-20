import { Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as si from 'systeminformation';
import { VitalsModule } from './vitals/vitals.module';
import { platform } from 'node:os';
import { SettingsModule } from './settings/settings.module';
import { EventsModule } from './events/events.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CLIENT_DIR } from './app.constants';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: CLIENT_DIR,
      serveStaticOptions: {
        index: 'index.html',
      },
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot({
      global: true,
      verboseMemoryLeak: true,
      delimiter: '.',
    }),
    EventsModule,
    VitalsModule,
    SettingsModule,
  ],
})
export class AppModule implements OnApplicationShutdown {
  private readonly logger = new Logger(AppModule.name);

  onApplicationShutdown(signal?: string): void {
    this.logger.warn(`Application shutting down. Signal: ${signal}`);

    if (platform() === 'win32') {
      si.powerShellRelease();
    }
  }
}
