import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractTypeOrmService } from '@guojian/nestjs-abstract-module';
import { Repository } from 'typeorm';
import { ImageEntity } from './entity';
import { FILE_MODULE_INIT } from '../global.var';
import { FileWarpMd5, IFileFactory } from '../types';
import { Request, Response } from 'express';
import * as url from 'url';
import { FileStorageInstall } from '../module';

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
    //返回链接地址
    try {
      const { path, md5, size } = await this.fileFactory.saveFile(
        file,
        req,
        res,
      );
      //保存数据库
      const domain = this.fileFactory.domain();
      const result = await this.create({
        object_name: path,
        size: size,
      });
      if (result) {
        return {
          path: new url.URL(path, domain),
        };
      }
    } catch (e) {
      throw e;
    }
  }
  async uploadByBinary(req: Request, res: Response) {
    try {
      const file = await new Promise((resolve, reject) => {
        FileStorageInstall.install._handleFile(
          req,
          undefined,
          function (err, result) {
            if (err) {
              reject(err);
            }
            resolve(result);
          },
        );
      });
      return await this.uploadObject(file as any, req, res);
    } catch (e) {
      console.log('113123');
      throw e;
    }
  }
}
