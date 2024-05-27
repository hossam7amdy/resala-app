import fs from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import LocalStorage from './local-storage.js';

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
  const buffer = Buffer.from('test content');
  const key = 'test_file.txt';

  beforeEach(() => {
    localStorage = new LocalStorage({ baseUrl, rootDirectory });
    fs.writeFile.mockClear();
    fs.readFile.mockClear();
    fs.unlink.mockClear();
    fs.readdir.mockClear();
    fs.stat.mockClear();
    fs.access.mockClear();
    fs.mkdir.mockClear();
  });

  describe('uploadFile', () => {
    it('should upload a file and return its public URL', async () => {
      const path = join(__dirname, '..', '..', '..', rootDirectory, key);
      const publicUrl = `${baseUrl}/${rootDirectory}/${key}`;

      vi.spyOn(localStorage, 'getPath').mockReturnValue(path);
      vi.spyOn(localStorage, 'getPublicUrl').mockReturnValue(publicUrl);
      vi.spyOn(localStorage, 'createDirectoryIfNotExist').mockResolvedValue('CREATED');

      const result = await localStorage.uploadFile(buffer, key);

      expect(localStorage.getPath).toHaveBeenCalledWith(key);
      expect(localStorage.createDirectoryIfNotExist).toHaveBeenCalledWith(dirname(path));
      expect(fs.writeFile).toHaveBeenCalledWith(path, buffer);
      expect(result).toBe(publicUrl);
    });
  });

  describe('downloadFile', () => {
    it('should download a file and return its content as a buffer', async () => {
      const path = join(__dirname, '..', '..', '..', rootDirectory, key);

      vi.spyOn(localStorage, 'getPath').mockReturnValue(path);
      fs.readFile.mockResolvedValue(buffer);

      const result = await localStorage.downloadFile(key);

      expect(localStorage.getPath).toHaveBeenCalledWith(key);
      expect(fs.readFile).toHaveBeenCalledWith(path);
      expect(result).toBe(buffer);
    });
  });

  describe('deleteFile', () => {
    it('should delete a file', async () => {
      const path = join(__dirname, '..', '..', '..', rootDirectory, key);

      vi.spyOn(localStorage, 'getPath').mockReturnValue(path);

      await localStorage.deleteFile(key);

      expect(localStorage.getPath).toHaveBeenCalledWith(key);
      expect(fs.unlink).toHaveBeenCalledWith(path);
    });
  });

  describe('deleteFiles', () => {
    it('should delete multiple files', async () => {
      const keys = ['file1.txt', 'file2.txt'];
      const paths = keys.map(key => join(__dirname, '..', '..', '..', rootDirectory, key));

      vi.spyOn(localStorage, 'getPath').mockImplementation(key =>
        join(__dirname, '..', '..', '..', rootDirectory, key)
      );

      await localStorage.deleteFiles(keys);

      keys.forEach((key, index) => {
        expect(localStorage.getPath).toHaveBeenCalledWith(key);
        expect(fs.unlink).toHaveBeenCalledWith(paths[index]);
      });
    });
  });

  describe('listFiles', () => {
    it('should list files in a directory', async () => {
      const files = ['file1.txt', 'file2.txt'];
      const path = join(__dirname, '..', '..', '..', rootDirectory, key);

      vi.spyOn(localStorage, 'getPath').mockReturnValue(path);
      fs.readdir.mockResolvedValue(files);

      const result = await localStorage.listFiles(key);

      expect(localStorage.getPath).toHaveBeenCalledWith(key);
      expect(fs.readdir).toHaveBeenCalledWith(path);
      expect(result).toEqual(files.map(file => join(key, file)));
    });
  });

  describe('getFileMetadata', () => {
    it('should return file metadata', async () => {
      const path = join(__dirname, '..', '..', '..', rootDirectory, key);
      const stat = {
        size: 1024,
        mtime: new Date(),
      };

      vi.spyOn(localStorage, 'getPath').mockReturnValue(path);
      fs.stat.mockResolvedValue(stat);

      const result = await localStorage.getFileMetadata(key);

      expect(localStorage.getPath).toHaveBeenCalledWith(key);
      expect(fs.stat).toHaveBeenCalledWith(path);
      expect(result).toEqual({
        size: stat.size,
        lastModified: stat.mtime,
      });
    });
  });

  describe('createDirectoryIfNotExist', () => {
    it('should create a directory if it does not exist', async () => {
      const path = join(__dirname, '..', '..', '..', rootDirectory, 'new_dir');

      fs.access.mockRejectedValue(new Error('Directory does not exist'));
      fs.mkdir.mockResolvedValue();

      const result = await localStorage.createDirectoryIfNotExist(path);

      expect(fs.access).toHaveBeenCalledWith(path);
      expect(fs.mkdir).toHaveBeenCalledWith(path, { recursive: true });
      expect(result).toBe('CREATED');
    });

    it('should return EXIST if the directory already exists', async () => {
      const path = join(__dirname, '..', '..', '..', rootDirectory, 'existing_dir');

      fs.access.mockResolvedValue();

      const result = await localStorage.createDirectoryIfNotExist(path);

      expect(fs.access).toHaveBeenCalledWith(path);
      expect(fs.mkdir).not.toHaveBeenCalled();
      expect(result).toBe('EXIST');
    });
  });
});
