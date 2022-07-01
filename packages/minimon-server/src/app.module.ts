import { Logger, Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule, SchedulerRegistry } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PiMonConfig, piMonConfigSchema } from './common/config.schema';
import * as si from 'systeminformation';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(AppModule.name);

  constructor(
    private readonly configService: ConfigService<PiMonConfig>,
    private readonly appService: AppService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async onModuleInit(): Promise<void> {
    si.powerShellStart();

    await this.appService.updateStats();

    const job = setInterval(() => this.appService.updateStats(), this.configService.get('POLLING_INTERVAL'));

    this.schedulerRegistry.addInterval('Stats Job', job);
  }

  onApplicationShutdown(signal?: string): void {
    this.logger.warn(`Application shutting down. Signal: ${signal}`);

    si.powerShellRelease();
  }
}
