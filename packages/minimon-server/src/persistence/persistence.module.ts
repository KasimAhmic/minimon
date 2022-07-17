import { DynamicModule, Module } from '@nestjs/common';
import Joi from 'joi';
import { PERSISTENCE_CONFIG } from './persistence.constants';
import { PersistenceService } from './persistence.service';

type BasePersistenceModuleConfig = {
  fileName: string;
  createFileIfNonExistant: boolean;
  validateFile: boolean;
  fileId: string;
};

type FileCreationConfig =
  | { createFileIfNonExistant: false }
  | { createFileIfNonExistant: true; defaultFileContents: string };

type FileValidationConfig<T> =
  | { validateFile: false }
  | { validateFile: true; validationSchema: Joi.Schema<T> };

export type PersistenceModuleConfig<T> = BasePersistenceModuleConfig &
  FileCreationConfig &
  FileValidationConfig<T>;

@Module({})
export class PersistenceModule {
  static forFeature<FileContentsType = unknown>(
    config: PersistenceModuleConfig<FileContentsType>,
  ): DynamicModule {
    return {
      module: PersistenceModule,
      providers: [
        PersistenceService,
        {
          provide: PERSISTENCE_CONFIG,
          useValue: config,
        },
        {
          provide: config.fileId,
          useFactory: async (persistenceService: PersistenceService<FileContentsType>) => {
            return persistenceService.read();
          },
          inject: [PersistenceService],
        },
      ],
      exports: [PersistenceService, config.fileId],
    };
  }
}
