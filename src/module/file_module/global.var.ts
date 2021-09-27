import { IFileFactory } from './type';

export const FileSaveFactor: { factory: IFileFactory } = {
  factory: undefined,
};

export class LocalFileFactor implements IFileFactory {
  constructor(options?: any) {
    console.log(options);
  }
  async saveFile(file) {
    console.log(file);
  }
}

FileSaveFactor.factory = new LocalFileFactor('123123');
