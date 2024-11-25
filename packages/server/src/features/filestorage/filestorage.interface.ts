export interface IFileStorage {
  upload(file: Express.Multer.File, key: string): Promise<string>;
  delete(key: string): Promise<void>;
  deleteMany(key: string[]): Promise<void>;
}
