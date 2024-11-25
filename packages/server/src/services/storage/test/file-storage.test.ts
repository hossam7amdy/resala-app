import { beforeEach, describe, expect, it, vi } from 'vitest';

import { BadRequestError } from '../../../errors/api.errors.js';
import { FileStorage } from '../file-storage.js';

// Mock S3Service
vi.mock('services/s3', () => ({
  S3Service: vi.fn().mockImplementation(() => ({
    upload: vi.fn().mockResolvedValue('https://example.com/file.jpg'),
    delete: vi.fn().mockResolvedValue(undefined),
    deleteMany: vi.fn().mockResolvedValue(undefined),
  })),
}));

describe('FileStorage', () => {
  let fileStorage: FileStorage;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    // Get a new instance of FileStorage
    fileStorage = FileStorage.getInstance();
  });

  it('should be a singleton', () => {
    const instance1 = FileStorage.getInstance();
    const instance2 = FileStorage.getInstance();
    expect(instance1).toBe(instance2);
  });

  describe('uploadFile', () => {
    it('should upload a file successfully', async () => {
      const mockFile = {
        originalname: 'test.jpg',
        buffer: Buffer.from('test'),
      } as Express.Multer.File;

      const result = await fileStorage.uploadFile(mockFile);

      expect(result).toEqual({
        key: expect.stringMatching(/^[a-f0-9-]+\.jpg$/),
        url: 'https://example.com/file.jpg',
      });
    });

    it('should throw BadRequestError if no file is provided', async () => {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      await expect(fileStorage.uploadFile(undefined as any)).rejects.toThrow(BadRequestError);
    });

    it('should use the provided directory', async () => {
      const mockFile = {
        originalname: 'test.jpg',
        buffer: Buffer.from('test'),
      } as Express.Multer.File;

      const result = await fileStorage.uploadFile(mockFile, 'images');

      expect(result.key).toMatch(/^images\/[a-f0-9-]+\.jpg$/);
    });
  });

  describe('uploadFiles', () => {
    it('should upload multiple files successfully', async () => {
      const mockFiles = [
        { originalname: 'test1.jpg', buffer: Buffer.from('test1') },
        { originalname: 'test2.png', buffer: Buffer.from('test2') },
      ] as Express.Multer.File[];

      const results = await fileStorage.uploadFiles(mockFiles);

      expect(results).toHaveLength(2);
      expect(results[0]).toEqual({
        key: expect.stringMatching(/^[a-f0-9-]+\.jpg$/),
        url: 'https://example.com/file.jpg',
      });
      expect(results[1]).toEqual({
        key: expect.stringMatching(/^[a-f0-9-]+\.png$/),
        url: 'https://example.com/file.jpg',
      });
    });

    it('should throw BadRequestError if no files are provided', async () => {
      await expect(fileStorage.uploadFiles([])).rejects.toThrow(BadRequestError);
    });
  });

  describe('deleteFile', () => {
    it('should delete a file successfully', async () => {
      const result = await fileStorage.deleteFile('test-key');
      expect(result).toBe('File deleted');
    });
  });

  describe('deleteFiles', () => {
    it('should delete multiple files successfully', async () => {
      const result = await fileStorage.deleteFiles(['key1', 'key2']);
      expect(result).toBe('Files deleted');
    });
  });
});
