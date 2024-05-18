import { v4 as uuid } from 'uuid';

import type { IFileStorage } from '../interfaces/file-storage.js';

export default class FileService {
  constructor(private readonly fileStorage: IFileStorage) {}

  async uploadFile(file: Express.Multer.File, directory: string = 'uploads') {
    const fileExtension = file.originalname.split('.').pop();
    const key = `${directory}/${this._generateFileKey()}.${fileExtension}`;

    const url = await this.fileStorage.uploadFile(file.buffer, key);

    return { key, url };
  }

  async uploadFiles(files: Express.Multer.File[], directory?: string) {
    const urls: string[] = await Promise.all(
      files.map(async file => {
        const { url } = await this.uploadFile(file, directory);
        return url;
      })
    );

    return urls;
  }

  async deleteFile(url: string) {
    // const key = this._keyFromUrl(url);
    return await this.fileStorage.deleteFile(url);
  }

  async deleteFiles(urls: string[]) {
    // const keys = urls.map(url => this._keyFromUrl(url));
    return await this.fileStorage.deleteFiles(urls);
  }

  private _generateFileKey() {
    return uuid();
  }

  // private _keyFromUrl(url: string) {
  //   const urlParts = url.replace(`${this.baseUrl}/`, '');
  //   return urlParts;
  // }
}
