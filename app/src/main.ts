import { NestFactory } from '@nestjs/core';
import { type NestExpressApplication } from '@nestjs/platform-express';
import { VersioningType } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app: NestExpressApplication = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
