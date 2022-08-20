import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

const logger = new Logger('Minimon');

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.enableShutdownHooks();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const host = process.env.NODE_ENV === 'development' ? 'localhost' : '0.0.0.0';
  const port = process.env.NODE_ENV === 'development' ? 3001 : 8080;

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
