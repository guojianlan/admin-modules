import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { getAddProviders, AdminModule } from './modules';
import { HttpModule } from '@nestjs/axios';
const { Controllers, Services, Entities } = getAddProviders();
import * as Redis from 'ioredis';
console.log(Controllers, Services, Entities);
export class RedisUserAuthCache {
  public clientRedis: Redis.Redis;
  public options: any;
  constructor() {
    this.clientRedis = new Redis({
      host: '127.0.0.1',
      port: 6379,
      password: '5201314qv',
      db: 3,
    });
  }
  async init(options: any) {
    this.options = options;
  }
  async get(key: string) {
    console.log('get', 'RedisUserAuthCache');
    return await this.clientRedis.get(key);
  }
  async set(key: string, value: string) {
    console.log('set', 'RedisUserAuthCache');
    try {
      await this.clientRedis.set(key, value, 'ex', 3000);
      return key;
    } catch (e) {
      throw e;
    }
  }
  async remote() {
    console.log('remove');
  }
}
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
      UserStore: {
        // classObject: RedisUserAuthCache,
        options: {
          ttl: 3000,
        },
      },
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
