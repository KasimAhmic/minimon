import { Test, TestingModule } from '@nestjs/testing';
import { PERSISTENCE_CONFIG } from './persistence.constants';
import { PersistenceService } from './persistence.service';
import Joi from 'joi';
import { join } from 'path';

const mockReadFile = jest.fn();
const mockWriteFile = jest.fn();

jest.mock('node:fs/promises', () => ({
  readFile: () => mockReadFile(),
  writeFile: (path: string, contents: string) => mockWriteFile(path, contents),
}));

const CONFIG = 'CONFIG';

describe('PersistenceService', () => {
  let service: PersistenceService<string>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PERSISTENCE_CONFIG,
          useValue: {
            fileName: 'test.json',
            createFileIfNonExistant: true,
            defaultFileContents: '{"hello": "world"}',
            validateFile: true,
            validationSchema: Joi.object(),
            fileId: CONFIG,
          },
        },
        PersistenceService,
      ],
    }).compile();

    service = module.get<PersistenceService<string>>(PersistenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('injects the PersistenceConfig', () => {
    expect(service.persistenceConfig.fileName).toBe('test.json');
    expect(service.persistenceConfig.createFileIfNonExistant).toBe(true);
    expect(service.persistenceConfig.validateFile).toBe(true);
    expect(service.persistenceConfig.fileId).toBe(CONFIG);

    expect(
      service.persistenceConfig.createFileIfNonExistant && service.persistenceConfig.defaultFileContents,
    ).toBe('{"hello": "world"}');
    expect(service.persistenceConfig.validateFile && service.persistenceConfig.validationSchema).toBe(
      Joi.object(),
    );
  });

  it('reads the persisted file', async () => {
    mockReadFile.mockReturnValue('{"hello": "world"}');

    const result = await service.read();

    expect(result).toEqual({ hello: 'world' });
    expect(mockReadFile).toHaveBeenCalledTimes(1);
  });

  it('attempts to create the file if not found', async () => {
    mockReadFile.mockImplementation(() => {
      throw new Error();
    });

    const result = await service.read();

    expect(result).toEqual({ hello: 'world' });
    expect(mockReadFile).toHaveBeenCalledTimes(1);
    expect(mockWriteFile).toHaveBeenCalledTimes(1);
    expect(mockWriteFile).toHaveBeenCalledWith(
      join(__dirname, '..', '..', 'test.json'),
      '{"hello": "world"}',
    );
  });

  it('logs an error if the write fails', async () => {
    mockWriteFile.mockImplementation(() => {
      throw new Error();
    });

    const result = await service.write('test');

    expect(result).toEqual('test');
  });

  it('throws an error if the validation fails', () => {
    expect(() => service.validate('testing')).toThrow();
  });
});
