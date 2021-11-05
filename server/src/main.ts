import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';
import config from './config';

async function bootstrap() {
  const { port, frontendURL } = config();
  const app = await NestFactory.create(AppModule, {
    cors: { origin: frontendURL },
  });
  await app.listen(port);
}

bootstrap();
