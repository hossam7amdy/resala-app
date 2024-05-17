import { v4 as uuid } from 'uuid';

import type { IFileStorage } from '../interfaces/file-storage.js';

export default class FileService {
  constructor(
    private readonly endpoint: string,
    private readonly fileStorage: IFileStorage
  ) {}

  async uploadFile(file: Express.Multer.File, directory: string = 'uploads') {
    const key = `${directory}/${this._generateFileKey()}-${file.originalname}`;

    await this.fileStorage.uploadFile(file.path, key);

    return {
      key,
      url: this._generateS3Url(key),
    };
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
    const key = this._keyFromUrl(url);
    return await this.fileStorage.deleteFile(key);
  }

  async deleteFiles(urls: string[]) {
    const keys = urls.map(url => this._keyFromUrl(url));
    return await this.fileStorage.deleteFiles(keys);
  }

  private _generateS3Url(key: string) {
    return `${this.endpoint}/${key}`;
  }

  private _generateFileKey() {
    return uuid();
  }

  private _keyFromUrl(url: string) {
    const urlParts = url.replace(`${this.endpoint}/`, '');
    return urlParts;
  }
}
