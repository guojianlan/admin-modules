import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('server-http:127.0.0.1:3000 start')
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
