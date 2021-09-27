import { Request, Response } from 'express';
export type FileWarpMd5 = Express.Multer.File & { md5: string };
export interface IFileFactory {
  saveFile: (
    file: FileWarpMd5,
    req: Request,
    res: Response,
  ) => Promise<{
    path: string;
    size: number;
    md5: string;
  }>;
}
export interface Param {
  controllers: any[];
  providers: any[];
  imports: any[];
  inject: any[];
  destination?: string;
  useFactory: (...args: any[]) => Promise<IFileFactory>;
}
