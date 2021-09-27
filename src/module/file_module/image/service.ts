import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractTypeOrmService } from '@guojian/nestjs-abstract-module';
import { Repository } from 'typeorm';
import { ImageEntity } from './entity';
import * as FileType from 'file-type';
import { FILE_MODULE_INIT } from '../global.var';
import { FileWarpMd5, IFileFactory } from '../types';
import { Request, Response } from 'express';
import * as mimeObject from 'mime';

@Injectable()
export class ImageService extends AbstractTypeOrmService<ImageEntity> {
  constructor(
    @InjectRepository(ImageEntity)
    readonly repository: Repository<ImageEntity>, // entity,
    @Inject(FILE_MODULE_INIT) private readonly fileFactory: IFileFactory,
  ) {
    super(repository, ImageEntity);
    this.options = Object.assign({
      ...this.options,
      deleteAfterAction: 'normal',
    });
  }
  async uploadObject(file: FileWarpMd5, req: Request, res: Response) {
    // const { ext, mime } = await FileType.fromBuffer(file.buffer);
    // const { ext, mime } = await FileType.fromFile(file.path);
    // console.log(ext, mimeObject.extension(mime));
    //返回链接地址
    const { path, md5, size } = await this.fileFactory.saveFile(file, req, res);
  }
}
