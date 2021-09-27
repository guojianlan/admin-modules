import { Injectable } from '@nestjs/common';

@Injectable()
export class FileFactor {
  constructor(options?: any) {
    console.log(options);
  }
  async saveFile(file) {
    console.log(file);
  }
}
