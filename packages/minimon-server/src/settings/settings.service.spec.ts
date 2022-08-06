import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { EventsModule } from '../events/events.module';
import { PERSISTENCE_CONFIG } from '../persistence/persistence.constants';
import { PersistenceService } from '../persistence/persistence.service';
import { SETTINGS_FILE } from './settings.constants';
import { SettingsService } from './settings.service';

describe('EventsService', () => {
  let service: SettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EventsModule,
        EventEmitterModule.forRoot({
          global: true,
          verboseMemoryLeak: true,
          delimiter: '.',
        }),
      ],
      providers: [
        SettingsService,
        {
          provide: PERSISTENCE_CONFIG,
          useValue: 'PERSISTENCE_CONFIG',
        },
        {
          provide: SETTINGS_FILE,
          useValue: 'SETTINGS FILE',
        },
      ],
    })
      .useMocker((token) => {
        if (token === PersistenceService) {
          return {
            read: jest.fn(),
            write: jest.fn(),
            validate: jest.fn(),
          };
        }
      })
      .compile();

    service = module.get<SettingsService>(SettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
