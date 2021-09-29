import {
  Controller,
  Module,
  UseGuards,
  applyDecorators,
  SetMetadata,
  MiddlewareConsumer,
  BadRequestException,
  ForbiddenException,
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
  ImageController,
  FileStorageInstall,
} from './module/file_module';
import { FileFactorCos } from './module/file_module/FileFactorCos';
import { Response } from 'express';
import { ModuleRef } from '@nestjs/core';

const { Controllers, Services, Entities } = getAddProviders();

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
          port: 6379,
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
      useFactory: async (configService: ConfigService) => {
        const imageMaxSize = 100000;
        FileStorageInstall.middlewareFn = (consumer: MiddlewareConsumer) => {
          consumer
            .apply(function (req, res: Response, next) {
              const header = req.headers;
              if (header['content-length'] > imageMaxSize) {
                next(new BadRequestException());
              }
              next();
            })
            .forRoutes('image/(*)');
        };
        return new FileFactor({
          domain: () => {
            return 'http://127.0.0.1:3001';
          },
        });
        // const upload = ImageController.prototype.uploadImage;
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
