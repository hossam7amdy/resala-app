import { v4 as uuid } from 'uuid';

import type { IFileStorageService } from '../../interfaces/index.js';

export default class FileService {
  constructor(private readonly fileStorage: IFileStorageService) {}

  async uploadFile(file: Express.Multer.File, directory?: string) {
    const fileExtension = file.originalname.split('.').pop();
    const filename = `${uuid()}.${fileExtension}`;
    const key = directory ? `${directory}/${filename}` : filename;

    const url = await this.fileStorage.uploadFile(file.buffer, key);
    return { key, url };
  }

  async uploadFiles(files: Express.Multer.File[], directory?: string) {
    return Promise.all(
      files.map(async file => {
        return await this.uploadFile(file, directory);
      })
    );
  }

  async deleteFile(key: string) {
    return await this.fileStorage.deleteFile(key);
  }

  async deleteFiles(keys: string[]) {
    return await this.fileStorage.deleteFiles(keys);
  }
}
