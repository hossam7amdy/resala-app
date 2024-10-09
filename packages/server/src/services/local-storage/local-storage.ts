import fs from 'fs/promises';
import { dirname, join } from 'path';

interface LocalStorageOptions {
  baseUrl?: string;
  rootDirectory?: string;
}
export class LocalStorage {
  private readonly baseUrl: string;
  private readonly rootDirectory: string;

  constructor(options?: LocalStorageOptions) {
    this.baseUrl = options?.baseUrl ?? process.env.SERVER_URL;
    this.rootDirectory = options?.rootDirectory ?? 'uploads'; // Default rootDirectory
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
