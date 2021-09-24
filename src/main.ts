import { Get, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Store } from './modules';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  setTimeout(() => {
    Store.userStore.changeOptions({ ttl: 3333333 });
  }, 2000);
  setTimeout(() => {
    Store.userStore.changeOptions({ ttl: 3 });
  }, 10000);
  await app.listen(3001, function () {
    console.log('server-http:127.0.0.1:3001 start');
  });
}
bootstrap();
