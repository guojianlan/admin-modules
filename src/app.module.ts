import {
  Module,
  MiddlewareConsumer,
  BadRequestException,
  ForbiddenException,
  forwardRef,
  INestApplication,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getAddProviders, AdminModule, Store } from './module/admin_module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisUserAuthCache } from './userCacheRedis';
import {
  ImageModule,
  FileBaseModule,
  FileFactor,
  FileStorageInstall,
} from './module/file_module';
import { Request, Response } from 'express';
import { GuardStore } from './module/file_module/runFn';
import { AuthGuard } from './module/admin_module/decorators';
import { AdminAuthGuard } from './module/admin_module/decorators/guards';
import { MulterError } from 'multer';
import { ModuleRef } from '@nestjs/core';
const { Controllers, Services, Entities } = getAddProviders();
export const RootModule: {
  install: INestApplication;
} = {
  install: undefined,
};
@Module({
  imports: [
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
          entities: [...Object.values(Entities), ...FileBaseModule.entities],
          synchronize: true,
          logging: false,
        };
      },
    }),
    AdminModule.forRootAsync({
      useFactory: async (config: ConfigService, http: HttpService) => {
        Store.userStore = new RedisUserAuthCache({
          host: '127.0.0.1',
          port: 6378,
          password: '5201314qv',
        });
      },
      imports: [
        TypeOrmModule.forFeature(Object.values(Entities)),
        ConfigModule,
      ],
      controllers: [...Object.values(Controllers)],
      providers: [...Object.values(Services)],
      inject: [ConfigService],
    }),
    ImageModule.forRootAsync({
      imports: [TypeOrmModule.forFeature(FileBaseModule.entities)],
      controllers: [...FileBaseModule.controllers],
      providers: [...FileBaseModule.providers],
      inject: [ConfigService, ModuleRef],
      destination: 'upload/',
      useFactory: async (
        configService: ConfigService,
        moduleRef: ModuleRef,
      ) => {
        const imageMaxSize = 1024 * 1024 * 10; //100
        GuardStore.inject = async (context) => {
          //限制大小
          const req = context.switchToHttp().getRequest<Request>();
          const header = req.headers;
          if (+header['content-length'] > imageMaxSize) {
            throw new BadRequestException();
          }
          const auth = RootModule.install.get(AdminAuthGuard);
          return await auth.canActivate(context);
        };
        return new FileFactor({
          domain: () => {
            return 'http://127.0.0.1:3001';
          },
        });
        // return new FileFactorCos({
        //   SecretKey: configService.get('COS_SECRETKEY'),
        //   SecretId: configService.get('COS_SECRETID'),
        //   bucket: configService.get('COS_BUCKET'),
        //   region: configService.get('COS_REGION'),
        //   Key: (path) => {
        //     console.log(path);
        //     return path;
        //   },
        //   domain: () => {
        //     return 'https://testupload-1256172954.cos.ap-chengdu.myqcloud.com';
        //   },
        // });
      },
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
