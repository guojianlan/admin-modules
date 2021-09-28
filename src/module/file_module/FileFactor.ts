import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { IFileFactory } from './types';
import { MulterError } from 'multer';
export interface IFileFactorOption {
  domain: () => string;
}
export class FileFactor implements IFileFactory {
  domain: () => string;
  constructor(options: IFileFactorOption) {
    this.domain = options.domain;
  }
  async saveFile(
    file: Express.Multer.File & { md5: string },
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
  ) {
    return {
      path: file.path.replace(/^\//, ''),
      size: file.size,
      md5: file.md5,
    };
  }
}
