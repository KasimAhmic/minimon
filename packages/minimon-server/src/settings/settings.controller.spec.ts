import { Test, TestingModule } from '@nestjs/testing';
import { PersistenceModule } from '../persistence/persistence.module';
import { EventsModule } from '../events/events.module';
import { SETTINGS_FILE } from './settings.constants';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

describe('EventsController', () => {
  let controller: SettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EventsModule,
        EventEmitterModule.forRoot({
          global: true,
          verboseMemoryLeak: true,
          delimiter: '.',
        }),
        PersistenceModule.forFeature({
          fileName: 'test.json',
          createFileIfNonExistant: false,
          validateFile: false,
          fileId: SETTINGS_FILE,
        }),
      ],
      controllers: [SettingsController],
      providers: [SettingsService],
    }).compile();

    controller = module.get<SettingsController>(SettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
