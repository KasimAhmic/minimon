import { Module } from '@nestjs/common';
import { EventsModule } from 'src/events/events.module';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { PersistenceModule } from 'src/persistence/persistence.module';
import { defaultSettings, Settings, ThemeMode } from '@ahmic/minimon-core';
import Joi from 'joi';

@Module({
  imports: [
    EventsModule,
    PersistenceModule.forFeature<Settings>({
      fileName: 'settings.json',
      createFileIfNonExistant: true,
      defaultFileContents: JSON.stringify(defaultSettings, null, 2),
      validateFile: true,
      validationSchema: Joi.object<Settings, true>({
        clickToReload: Joi.boolean(),
        showDebugScreen: Joi.boolean(),
        themeMode: Joi.string().valid(...Object.values(ThemeMode)),
        pollingInterval: Joi.number(),
      }),
    }),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
