import { Inject, Injectable, Logger } from '@nestjs/common';
import { PERSISTENCE_CONFIG } from './persistence.constants';
import { PersistenceModuleConfig } from './persistence.module';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

@Injectable()
export class PersistenceService<FileContentsType> {
  private readonly logger = new Logger(PersistenceService.name);

  constructor(
    @Inject(PERSISTENCE_CONFIG)
    private readonly persistenceConfig: PersistenceModuleConfig<FileContentsType>,
  ) {}

  async read(): Promise<FileContentsType> {
    let file: string;
    const fileName = this.persistenceConfig.fileName;

    try {
      file = await readFile(join(__dirname, fileName), {
        encoding: 'utf-8',
        flag: 'r',
      });
    } catch {
      this.logger.warn(`'${fileName}' file not found`);

      if (this.persistenceConfig.createFileIfNonExistant) {
        this.logger.warn(`Creating '${fileName}' with default contents`);

        file = await this.write(this.persistenceConfig.defaultFileContents);
      }
    }

    return this.validate(file);
  }

  async write(fileContents: string): Promise<string> {
    const fileName = this.persistenceConfig.fileName;

    try {
      await writeFile(join(__dirname, fileName), fileContents, {
        encoding: 'utf-8',
        flag: 'w',
      });
    } catch (e) {
      this.logger.warn(`Failed to write file '${fileName}'`);

      this.logger.error(e);
    }

    return fileContents;
  }

  validate(fileContents: any): FileContentsType {
    if (!this.persistenceConfig.validateFile) return fileContents;

    let file: FileContentsType;

    try {
      file = JSON.parse(fileContents);
    } catch {
      file = fileContents;
    }

    const validationResult = this.persistenceConfig.validationSchema.validate(file);

    if (validationResult.error) {
      this.logger.error(
        `Validation for '${this.persistenceConfig.fileName}' failed. Please review the contents of the file or update your validation Schema`,
      );
      this.logger.error(validationResult.error);

      throw validationResult.error;
    }

    return validationResult.value;
  }
}
