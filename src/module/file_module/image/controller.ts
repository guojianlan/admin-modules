import { WrapController } from '@guojian/nestjs-abstract-module';
import { ImageEntity } from './entity';
import { ImageService } from './service';
import {
  Controller,
  Post,
  Req,
  Res,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { FileWarpMd5 } from '../types';
import { MulterError } from 'multer';
const CrudController = WrapController({
  model: ImageEntity,
});
@Controller('file')
export class ImageController extends CrudController {
  constructor(readonly service: ImageService) {
    super(service);
  }
  @Post('uploadByFormData')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
    }),
  )
  async uploadImage(
    @UploadedFile() file: FileWarpMd5,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // 获取临时目录的文件上传
    const result = await this.service.uploadObject(file, req, res);
    return result;
  }

  @Post('uploadByBinary')
  async uploadByBinary(
    @Req() req: Request,
    @Body() body: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const result = await this.service.uploadByBinary(req, res);
      return result;
    } catch (e) {
      throw e;
    }
  }
  @Get('test')
  test() {
    return process.memoryUsage();
  }
}
