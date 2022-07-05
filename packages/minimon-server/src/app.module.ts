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
    StatsModule,
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
