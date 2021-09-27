import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { IFileFactory } from './types';

export class FileFactor implements IFileFactory {
  constructor(options?: any) {
    console.log(options);
  }

  async saveFile(
    file: Express.Multer.File & { md5: string },
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
  ) {
    return {
      path: file.path,
      size: file.size,
      md5: file.md5,
    };
  }
}
