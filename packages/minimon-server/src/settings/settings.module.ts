import { Module } from '@nestjs/common';
import { EventsModule } from '../events/events.module';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { PersistenceModule } from '../persistence/persistence.module';
import { defaultSettings, Settings } from '@ahmic/minimon-core';
import { settingsValidationSchema, SETTINGS_FILE } from './settings.constants';

@Module({
  imports: [
    EventsModule,
    PersistenceModule.forFeature<Settings>({
      fileName: 'settings.json',
      createFileIfNonExistant: true,
      defaultFileContents: JSON.stringify(defaultSettings, null, 2),
      validateFile: true,
      validationSchema: settingsValidationSchema,
      fileId: SETTINGS_FILE,
    }),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
