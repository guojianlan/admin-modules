import { DynamicModule, Global, Module } from '@nestjs/common';
import { ImageController, ImageEntity, ImageService } from './image';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage, diskStorage } from 'multer';
import {
  CustomDiskStorage,
  FILE_MODULE_INIT,
  FILE_MODULE_PARAM,
} from './global.var';
import { Param } from './types';
export const FileStorageInstall = {
  install: undefined,
};
@Module({})
export class ImageModule {
  static async forRootAsync(param: Param): Promise<DynamicModule> {
    return {
      module: ImageModule,
      imports: [
        ...(param && (param.imports || [])),
        MulterModule.registerAsync({
          useFactory: () => {
            FileStorageInstall.install = new CustomDiskStorage({
              destination: param.destination || 'upload',
            });
            return {
              storage: FileStorageInstall.install,
            };
          },
        }),
      ],
      controllers: [...(param && (param.controllers || []))],
      providers: [
        {
          provide: FILE_MODULE_PARAM,
          useValue: param,
        },
        {
          provide: FILE_MODULE_INIT,
          useFactory: async (params) => {
            console.log(params);
            return await param.useFactory(params);
          },
          inject: [...(param && (param.inject || []))],
        },
        ...(param && (param.providers || [])),
      ],
      exports: [
        ...(param && (param.providers || [])),
        ...(param && (param.imports || [])),
      ],
    };
  }
}
export const FileBaseModule = {
  controllers: [ImageController],
  providers: [ImageService],
  entities: [ImageEntity],
};
