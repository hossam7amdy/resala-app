import { v4 as uuid } from 'uuid';

import { BadRequestError } from '../../errors/api.errors.js';
import { S3Service } from '../s3/index.js';

export class FileStorage {
  private static _instance: FileStorage | null = null;
  protected _fileStorage: S3Service;

  protected constructor() {
    this._fileStorage = new S3Service();
  }

  public static getInstance(): FileStorage {
    if (!this._instance) {
      this._instance = new FileStorage();
    }

    return this._instance;
  }

  async uploadFile(file: Express.Multer.File, directory?: string) {
    if (!file) throw new BadRequestError('No file provided');

    const fileExtension = file.originalname.split('.').pop();
    const filename = `${uuid()}.${fileExtension}`;
    const key = directory ? `${directory}/${filename}` : filename;

    const url = await this._fileStorage.upload(file, key);
    return { key, url };
  }

  async uploadFiles(files: Express.Multer.File[], directory?: string) {
    if (!files || !files.length) throw new BadRequestError('No files provided');

    return await Promise.all(files.map(file => this.uploadFile(file, directory)));
  }

  async deleteFile(key: string) {
    await this._fileStorage.delete(key);

    return 'File deleted';
  }

  async deleteFiles(keys: string[]) {
    await this._fileStorage.deleteMany(keys);

    return 'Files deleted';
  }
}
