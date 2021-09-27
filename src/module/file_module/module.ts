import { DynamicModule, Global, Module } from '@nestjs/common';
import { ImageController, ImageEntity, ImageService } from './image';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FileSaveFactor } from './global.var';
@Global()
@Module({})
export class ImageModule {
  static async forRootAsync(param: any): Promise<DynamicModule> {
    return {
      module: ImageModule,
      imports: [
        ...(param && (param.imports || [])),
        MulterModule.register({
          storage: memoryStorage(),
        }),
      ],
      controllers: [...(param && (param.controllers || []))],
      providers: [...(param && (param.providers || []))],
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
