import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractTypeOrmService } from '@guojian/nestjs-abstract-module';
import { Repository } from 'typeorm';
import { ImageEntity } from './entity';
import { ConfigService } from '@nestjs/config';
import * as FileType from 'file-type';
import { FileFactor } from '../FileFactor';
import { FileSaveFactor } from '../global.var';
@Injectable()
export class ImageService extends AbstractTypeOrmService<ImageEntity> {
  constructor(
    @InjectRepository(ImageEntity)
    readonly repository: Repository<ImageEntity>, // entity,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    super(repository, ImageEntity);
    this.options = Object.assign({
      ...this.options,
      deleteAfterAction: 'normal',
    });
    console.log(this.configService.get('redis_host'));
  }
  async uploadObject(file: Express.Multer.File) {
    const { ext, mime } = await FileType.fromBuffer(file.buffer);
    await FileSaveFactor.factory.saveFile(file);
    return {
      ext,
      mime,
    };
  }
}
