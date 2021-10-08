import { Module, BadRequestException, INestApplication } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getAddProviders, AdminModule, Store } from './module/admin_module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisUserAuthCache } from './userCacheRedis';
import {
  FileModule,
  FileBaseModule,
  FileFactor,
} from '@guojian/nestjs-file-module';
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
    FileModule.forRootAsync({
      imports: [TypeOrmModule.forFeature(FileBaseModule.entities), HttpModule],
      controllers: [...FileBaseModule.controllers],
      providers: [...FileBaseModule.providers],
      destination: 'upload/',
      inject: [ConfigService, HttpService],
      useFactory: async (FileStorageInstall, GuardStore) => {
        const imageMaxSize = 1024 * 1024 * 10; //100
        // GuardStore.inject = async (context) => {
        //   //限制大小
        //   // const req = context.switchToHttp().getRequest<Request>();
        //   // const header = req.headers;
        //   // if (+header['content-length'] > imageMaxSize) {
        //   //   throw new BadRequestException();
        //   // }
        //   // const auth = RootModule.install.get(AdminAuthGuard);
        //   // return await auth.canActivate(context);
        //   return true;
        // };
        return new FileFactor({
          domain: () => {
            return process.env.image_domain;
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
        //     return process.env.image_domain;
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
