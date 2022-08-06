import { Test, TestingModule } from '@nestjs/testing';
import { PERSISTENCE_CONFIG } from './persistence.constants';
import { PersistenceService } from './persistence.service';

describe('PersistenceService', () => {
  let service: PersistenceService<unknown>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersistenceService,
        {
          provide: PERSISTENCE_CONFIG,
          useValue: 'PERSISTENCE_CONFIG',
        },
      ],
    }).compile();

    service = module.get<PersistenceService<unknown>>(PersistenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
