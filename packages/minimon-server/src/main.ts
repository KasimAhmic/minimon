import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

const logger = new Logger('Minimon');

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.enableShutdownHooks();
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);

  const host = configService.get('HOST');
  const port = configService.get('PORT');

  process.on('warning', (e) => logger.warn(e.stack));

  try {
    const server = await app.listen(port, host);

    const address = server.address();

    logger.log(`Server listening at http://${address.address}:${address.port}`);
  } catch (err) {
    logger.error(err.stack);

    throw err;
  }
}

bootstrap();
