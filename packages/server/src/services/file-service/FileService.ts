import { v4 as uuid } from 'uuid';

import type { IFileStorage } from '../../interfaces/index.js';
import { BadRequestError } from '../../utils/ApiErrors.js';

export default class FileService {
  constructor(private readonly fileStorage: IFileStorage) {}

  async uploadFile(file: Express.Multer.File, directory?: string) {
    if (!file) throw new BadRequestError('No file provided');

    const fileExtension = file.originalname.split('.').pop();
    const filename = `${uuid()}.${fileExtension}`;
    const key = directory ? `${directory}/${filename}` : filename;

    const url = await this.fileStorage.upload(file.buffer, key);
    return { key, url };
  }

  async uploadFiles(files: Express.Multer.File[], directory?: string) {
    if (!files || !files.length) throw new BadRequestError('No files provided');

    return await Promise.all(
      files.map(async file => {
        return await this.uploadFile(file, directory);
      })
    );
  }

  async deleteFile(key: string) {
    await this.fileStorage.delete(key);

    return 'File deleted';
  }

  async deleteFiles(keys: string[]) {
    await this.fileStorage.deleteMany(keys);

    return 'Files deleted';
  }
}
