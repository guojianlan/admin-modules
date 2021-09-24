import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { getAddProviders, AdminModule } from './modules';
import { HttpModule, HttpService } from '@nestjs/axios';
const { Controllers, Services, Entities } = getAddProviders();
import * as Redis from 'ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';
console.log(Controllers, Services, Entities);
export class RedisUserAuthCache {
  public clientRedis: Redis.Redis;
  public options: any;
  constructor() {
    this.clientRedis = new Redis({
      host: '127.0.0.1',
      port: 6378,
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
    try {
      await this.clientRedis.set(key, value, 'ex', 3000);
      return key;
    } catch (e) {
      throw e;
    }
  }
  async remote(key: string) {
    try {
      await this.clientRedis.del(key);
      return key;
    } catch (e) {
      throw e;
    }
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
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          username: 'root',
          host: '127.0.0.1',
          port: 3316,
          password: 'example',
          database: 'test1',
          entities: [...Object.values(Entities)],
          synchronize: true,
          logging: true,
        };
      },
    }),
    AdminModule.forRootAsync({
      useFactory: async (config: ConfigService, ...args) => {
        console.log(config, '333333');
      },
      imports: [
        HttpModule,
        TypeOrmModule.forFeature(Object.values(Entities)),
        ConfigModule,
      ],
      controllers: [...Object.values(Controllers)],
      providers: [...Object.values(Services)],
      inject: [ConfigService, HttpService],
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
