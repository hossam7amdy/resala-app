import fs from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import type { FileMetadata, IFileStorage } from '../../interfaces/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface LocalStorageOptions {
  baseUrl?: string;
  rootDirectory?: string;
}
export default class LocalStorage implements IFileStorage {
  private readonly baseUrl: string;
  private readonly rootDirectory: string;

  constructor(options?: LocalStorageOptions) {
    this.baseUrl = options?.baseUrl ?? process.env.SERVER_URL;
    this.rootDirectory = options?.rootDirectory ?? 'uploads'; // Default rootDirectory
  }

  async upload(buffer: Buffer, key: string): Promise<string> {
    const path = this.getPath(key);

    await this.createDirectoryIfNotExist(dirname(path));
    await fs.writeFile(path, buffer);

    return this.getPublicUrl(key);
  }

  async download(key: string): Promise<Buffer> {
    const path = this.getPath(key);
    return await fs.readFile(path);
  }

  async delete(key: string): Promise<void> {
    const path = this.getPath(key);
    await fs.unlink(path);
  }

  async deleteMany(keys: string[]): Promise<void> {
    await Promise.all(keys.map(key => this.delete(key)));
  }

  async list(key: string): Promise<string[]> {
    const path = this.getPath(key);
    const files = await fs.readdir(path);
    return files.map(file => join(key, file));
  }

  async getMetadata(key: string): Promise<FileMetadata> {
    const path = this.getPath(key);
    const stat = await fs.stat(path);
    return {
      size: stat.size,
      lastModified: stat.mtime,
    };
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

  private getPublicUrl(key: string): string {
    return `${this.baseUrl}/${this.rootDirectory}/${key}`;
  }

  private getPath(key: string): string {
    return join(this.path, key);
  }

  private get path(): string {
    return join(__dirname, '..', '..', '..', this.rootDirectory);
  }
}
