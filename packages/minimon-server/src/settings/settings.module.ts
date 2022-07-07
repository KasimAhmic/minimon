import { Module } from '@nestjs/common';
import { EventsModule } from 'src/events/events.module';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [EventsModule],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
