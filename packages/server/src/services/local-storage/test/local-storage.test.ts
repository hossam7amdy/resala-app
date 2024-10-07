/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';

import { LocalStorage } from '../local-storage.js';

vi.mock('fs/promises');
vi.mock('path', () => ({
  dirname: vi.fn(),
  join: vi.fn(),
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('LocalStorage', () => {
  let localStorage: LocalStorage;
  const baseUrl = 'http://example.com';
  const rootDirectory = 'test_uploads';
  const multerFile = { buffer: Buffer.from('test') } as Express.Multer.File;
  const key = 'test_file.txt';

  beforeEach(() => {
    localStorage = new LocalStorage({ baseUrl, rootDirectory });
    vi.clearAllMocks();
  });

  describe('uploadFile', () => {
    it('should upload a multerFile and return its public URL', async () => {
      const path = join(__dirname, '..', '..', '..', rootDirectory, key);
      const publicUrl = `${baseUrl}/${rootDirectory}/${key}`;

      vi.spyOn(localStorage as any, 'getPath').mockImplementation(() => path);
      vi.spyOn(localStorage as any, 'getPublicUrl').mockImplementation(() => publicUrl);
      vi.spyOn(localStorage, 'createDirectoryIfNotExist').mockResolvedValue('CREATED');

      const result = await localStorage.upload(multerFile, key);

      expect((localStorage as any).getPath).toHaveBeenCalledWith(key);
      expect(localStorage.createDirectoryIfNotExist).toHaveBeenCalledWith(dirname(path));
      expect(fs.writeFile).toHaveBeenCalledWith(path, multerFile);
      expect(result).toBe(publicUrl);
    });
  });

  describe('deleteFile', () => {
    it('should delete a file', async () => {
      const path = join(__dirname, '..', '..', '..', rootDirectory, key);

      vi.spyOn(localStorage as any, 'getPath').mockReturnValue(path);

      await localStorage.delete(key);

      expect((localStorage as any).getPath).toHaveBeenCalledWith(key);
      expect(fs.unlink).toHaveBeenCalledWith(path);
    });
  });

  describe('deleteFiles', () => {
    it('should delete multiple files', async () => {
      const keys = ['file1.txt', 'file2.txt'];
      const paths = keys.map(key => join(__dirname, '..', '..', '..', rootDirectory, key));

      vi.spyOn(localStorage as any, 'getPath').mockImplementation(key =>
        join(__dirname, '..', '..', '..', rootDirectory, key as string)
      );

      await localStorage.deleteMany(keys);

      keys.forEach((key, index) => {
        expect((localStorage as any).getPath).toHaveBeenCalledWith(key);
        expect(fs.unlink).toHaveBeenCalledWith(paths[index]);
      });
    });
  });

  describe('createDirectoryIfNotExist', () => {
    it('should create a directory if it does not exist', async () => {
      const path = join(__dirname, '..', '..', '..', rootDirectory, 'new_dir');

      (fs.access as Mock).mockRejectedValue(new Error('Directory does not exist'));
      (fs.mkdir as Mock).mockResolvedValue(undefined);

      const result = await localStorage.createDirectoryIfNotExist(path);

      expect(fs.access).toHaveBeenCalledWith(path);
      expect(fs.mkdir).toHaveBeenCalledWith(path, { recursive: true });
      expect(result).toBe('CREATED');
    });

    it('should return EXIST if the directory already exists', async () => {
      const path = join(__dirname, '..', '..', '..', rootDirectory, 'existing_dir');

      (fs.access as Mock).mockResolvedValue('EXIST');

      const result = await localStorage.createDirectoryIfNotExist(path);

      expect(fs.access).toHaveBeenCalledWith(path);
      expect(fs.mkdir).not.toHaveBeenCalled();
      expect(result).toBe('EXIST');
    });
  });
});
