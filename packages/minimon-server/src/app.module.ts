import { Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { piMonConfigSchema } from './common/config.schema';
import * as si from 'systeminformation';
import { StatsModule } from './stats/stats.module';
import { platform } from 'os';
import { SettingsModule } from './settings/settings.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: piMonConfigSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'dist'),
    }),
    ScheduleModule.forRoot(),
    EventsModule,
    StatsModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
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
