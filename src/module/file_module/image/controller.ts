import { WrapController } from '@guojian/nestjs-abstract-module';
import { ImageEntity } from './entity';
import { ImageService } from './service';

import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
const CrudController = WrapController({
  model: ImageEntity,
});
@Controller('image')
export class ImageController extends CrudController {
  constructor(readonly service: ImageService) {
    super(service);
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    // 获取临时目录的文件上传
    const result = await this.service.uploadObject(file);
    return result;
  }
}
