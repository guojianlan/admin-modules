export interface IFileFactory {
  saveFile: (file: Express.Multer.File) => void;
}
