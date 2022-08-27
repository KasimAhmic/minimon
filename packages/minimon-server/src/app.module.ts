import { Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { configLoader } from './common/config.schema';
import * as si from 'systeminformation';
import { VitalsModule } from './vitals/vitals.module';
import { platform } from 'node:os';
import { SettingsModule } from './settings/settings.module';
import { EventsModule } from './events/events.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CLIENT_DIR } from './app.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [configLoader],
    }),
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
  controllers: [],
  providers: [],
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
