import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { IFileFactorCosOptions, IFileFactory } from './types';
import * as COS from 'cos-nodejs-sdk-v5';
import * as fs from 'fs-extra';
const prefix = () => {
  return '';
};
export class FileFactorCos implements IFileFactory {
  domain: () => string;
  cos: COS;
  bucket: string;
  region: string;
  prefix: () => string;
  Key: (path: string) => string;
  constructor(options: IFileFactorCosOptions) {
    this.cos = new COS({
      SecretId: options.SecretId,
      SecretKey: options.SecretKey,
    });
    this.bucket = options.bucket;
    this.region = options.region;
    this.Key = options.Key;
    this.domain = options.domain;
  }

  async saveFile(
    file: Express.Multer.File & { md5: string },
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
  ) {
    try {
      const key = this.Key(file.path);
      const result = await this.cos.putObject({
        Bucket: this.bucket,
        Region: this.region,
        Key: key,
        Body: fs.createReadStream(file.path),
        ContentLength: file.size,
      });
      if (result?.statusCode == 200) {
        await fs.remove(file.path);
        return {
          path: key.replace(/^\//, ''),
          size: file.size,
          md5: file.md5,
        };
      }
      throw new Error('上传失败');
    } catch (e) {
      throw e;
    }
  }
}
