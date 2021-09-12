import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { getAddProviders, AdminModule } from './modules';
import { HttpModule } from '@nestjs/axios';
const { Controllers, Services, Entities } = getAddProviders();
console.log(Controllers, Services, Entities);
@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'data/test.db',
    //   entities: [...Object.values(Entities)],
    //   synchronize: true,
    //   logging: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      host: '127.0.0.1',
      port: 3316,
      password: 'example',
      database: 'test1',
      entities: [...Object.values(Entities)],
      synchronize: true,
      logging: true,
    }),
    AdminModule.forRootAsync({
      imports: [TypeOrmModule.forFeature(Object.values(Entities))],
      controllers: [...Object.values(Controllers)],
      providers: [...Object.values(Services)],
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
