import { Get, ValidationPipe } from '@nestjs/common';
import { NestFactory, ModuleRef, ContextIdFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AdminUserController } from './modules';
export function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null),
      );
    });
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('server-http:127.0.0.1:3000 start');
  app.useGlobalPipes(new ValidationPipe());
  class Test {
    @Get('test')
    test() {
      return 'test2';
    }
  }
  applyMixins(AdminUserController, [Test]);
  await app.listen(3000);
}
bootstrap();
