import fs from 'fs/promises';
import { dirname, join } from 'path';

import { configuration } from '../../configuration/index.js';

interface LocalStorageOptions {
  baseUrl?: string;
  rootDirectory?: string;
}

const defaultOptions = {
  baseUrl: configuration.server.url,
  rootDirectory: 'uploads',
};

export class LocalStorage {
  private readonly baseUrl: string;
  private readonly rootDirectory: string;

  constructor(options: LocalStorageOptions = defaultOptions) {
    this.baseUrl = options.baseUrl ?? defaultOptions.baseUrl;
    this.rootDirectory = options.rootDirectory ?? defaultOptions.rootDirectory;
  }

  async upload(file: Express.Multer.File, key: string): Promise<string> {
    const path = this.getPath(key);

    await this.createDirectoryIfNotExist(dirname(path));
    await fs.writeFile(path, new Uint8Array(file.buffer));

    return this.getPublicUrl(key);
  }

  async delete(key: string): Promise<void> {
    const path = this.getPath(key);
    await fs.unlink(path);
  }

  async deleteMany(keys: string[]): Promise<void> {
    await Promise.all(keys.map(key => this.delete(key)));
  }

  async createDirectoryIfNotExist(path: string): Promise<'CREATED' | 'EXIST'> {
    try {
      await fs.access(path);
      return 'EXIST';
    } catch (err) {
      await fs.mkdir(path, { recursive: true });
      return 'CREATED';
    }
  }

  async exists(key: string): Promise<boolean> {
    const path = this.getPath(key);
    return fs
      .stat(path)
      .then(() => true)
      .catch(() => false);
  }

  private getPublicUrl(key: string): string {
    return `${this.baseUrl}/${this.rootDirectory}/${key}`;
  }

  private getPath(key: string): string {
    return join(this.path, key);
  }

  private get path(): string {
    return join(process.cwd(), this.rootDirectory);
  }
}
