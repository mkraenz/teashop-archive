import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const logger = new Logger();
  logger.log('Listening on http://localhost:3000');
  if (process.env.NODE_ENV !== 'production')
    logger.log('Graphql Playground at http://localhost:3000/graphql');
}
bootstrap();
