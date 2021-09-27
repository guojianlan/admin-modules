import { Controller, Module } from '@nestjs/common';
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
  ImageController,
  ImageService,
} from './module/file_module';

const { Controllers, Services, Entities } = getAddProviders();

@Controller('images')
class TextImage extends ImageController {
  constructor(service: ImageService) {
    super(service);
  }
}
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
          logging: true,
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
        HttpModule,
        TypeOrmModule.forFeature(Object.values(Entities)),
        ConfigModule,
      ],
      controllers: [...Object.values(Controllers)],
      providers: [...Object.values(Services)],
      inject: [ConfigService, HttpService],
    }),
    ImageModule.forRootAsync({
      imports: [TypeOrmModule.forFeature(FileBaseModule.entities)],
      controllers: [TextImage],
      providers: [...FileBaseModule.providers],
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
