import { Get, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ImageController } from './module/file_module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const a = app.get<ImageController>(ImageController);
  await app.listen(3001, function () {
    console.log('server http:127.0.0.1:3001 start');
  });
}
bootstrap();
