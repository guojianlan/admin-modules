import { WrapController } from '@guojian/nestjs-abstract-module';
import { ImageEntity } from './entity';
import { ImageService } from './service';
import {
  Controller,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { FileWarpMd5 } from '../types';
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
  async uploadImage(
    @UploadedFile() file: FileWarpMd5,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // 获取临时目录的文件上传
    const result = await this.service.uploadObject(file, req, res);
    return result;
  }
}
