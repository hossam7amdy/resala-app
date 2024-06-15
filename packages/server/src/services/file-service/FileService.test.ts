import { Readable } from 'stream';
import { v4 as uuid } from 'uuid';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { type MockProxy, mock } from 'vitest-mock-extended';

import type { IFileStorageService } from '../../interfaces/index.js';
import FileService from './FileService';

vi.mock('uuid', () => ({
  v4: vi.fn(),
}));

describe('FileService', (): void => {
  let fileStorageMock: MockProxy<IFileStorageService>;
  let fileService: FileService;

  beforeEach(() => {
    vi.clearAllMocks();

    fileStorageMock = mock<IFileStorageService>();
    fileService = new FileService(fileStorageMock);
  });

  describe('uploadFile', () => {
    it('should upload a file and return the key and url', async () => {
      const file: Express.Multer.File = {
        buffer: Buffer.from('test'),
        originalname: 'test.txt',
        fieldname: '',
        encoding: '',
        mimetype: '',
        size: 0,
        stream: new Readable(),
        destination: '',
        filename: '',
        path: '',
      };
      const directory = 'uploads';
      const fakeUuid = '1234-5678';
      const expectedKey = `${directory}/${fakeUuid}.txt`;
      const expectedUrl = 'http://example.com/uploads/1234-5678.txt';

      (uuid as Mock).mockReturnValue(fakeUuid);
      fileStorageMock.uploadFile.mockResolvedValue(expectedUrl);

      const result = await fileService.uploadFile(file, directory);

      expect(result).toEqual({ key: expectedKey, url: expectedUrl });
      expect(fileStorageMock.uploadFile).toHaveBeenCalledWith(file.buffer, expectedKey);
    });

    it('should upload a file without directory and return the key and url', async () => {
      const file: Express.Multer.File = {
        buffer: Buffer.from('test'),
        originalname: 'test.txt',
        fieldname: '',
        encoding: '',
        mimetype: '',
        size: 0,
        stream: new Readable(),
        destination: '',
        filename: '',
        path: '',
      };
      const fakeUuid = '1234-5678';
      const expectedKey = `${fakeUuid}.txt`;
      const expectedUrl = 'http://example.com/1234-5678.txt';

      (uuid as Mock).mockReturnValue(fakeUuid);
      fileStorageMock.uploadFile.mockResolvedValue(expectedUrl);

      const result = await fileService.uploadFile(file);

      expect(result).toEqual({ key: expectedKey, url: expectedUrl });
      expect(fileStorageMock.uploadFile).toHaveBeenCalledWith(file.buffer, expectedKey);
    });
  });

  describe('uploadFiles', () => {
    it('should upload multiple files and return their keys and urls', async () => {
      const files: Express.Multer.File[] = [
        {
          buffer: Buffer.from('test1'),
          originalname: 'test1.txt',
          fieldname: '',
          encoding: '',
          mimetype: '',
          size: 0,
          stream: new Readable(),
          destination: '',
          filename: '',
          path: '',
        },
        {
          buffer: Buffer.from('test2'),
          originalname: 'test2.txt',
          fieldname: '',
          encoding: '',
          mimetype: '',
          size: 0,
          stream: new Readable(),
          destination: '',
          filename: '',
          path: '',
        },
      ];
      const directory = 'uploads';
      const fakeUuids = ['1234-5678', '8765-4321'];
      const expectedKeys = [`${directory}/1234-5678.txt`, `${directory}/8765-4321.txt`];
      const expectedUrls = [
        'http://example.com/uploads/1234-5678.txt',
        'http://example.com/uploads/8765-4321.txt',
      ];

      (uuid as Mock).mockReturnValueOnce(fakeUuids[0]).mockReturnValueOnce(fakeUuids[1]);
      fileStorageMock.uploadFile
        .mockResolvedValueOnce(expectedUrls[0])
        .mockResolvedValueOnce(expectedUrls[1]);

      const result = await fileService.uploadFiles(files, directory);

      expect(result).toEqual([
        { key: expectedKeys[0], url: expectedUrls[0] },
        { key: expectedKeys[1], url: expectedUrls[1] },
      ]);
      expect(fileStorageMock.uploadFile).toHaveBeenCalledWith(files[0].buffer, expectedKeys[0]);
      expect(fileStorageMock.uploadFile).toHaveBeenCalledWith(files[1].buffer, expectedKeys[1]);
    });
  });

  describe('deleteFile', () => {
    it('should delete a file and return the result', async () => {
      const key = 'uploads/1234-5678.txt';

      fileStorageMock.deleteFile.mockResolvedValueOnce(undefined);

      const result = await fileService.deleteFile(key);

      expect(result).toEqual(undefined);
      expect(fileStorageMock.deleteFile).toHaveBeenCalledWith(key);
    });
  });

  describe('deleteFiles', () => {
    it('should delete multiple files and return the result', async () => {
      const keys = ['uploads/1234-5678.txt', 'uploads/8765-4321.txt'];

      fileStorageMock.deleteFiles.mockResolvedValue(undefined);

      const result = await fileService.deleteFiles(keys);

      expect(result).toEqual(undefined);
      expect(fileStorageMock.deleteFiles).toHaveBeenCalledWith(keys);
    });
  });

  describe('deleteFile', () => {
    it('should delete a file and return the result', async () => {
      const key = 'uploads/1234-5678.txt';
      fileStorageMock.deleteFile.mockResolvedValue(undefined);
      const result = await fileService.deleteFile(key);
      expect(result).toEqual(undefined);
      expect(fileStorageMock.deleteFile).toHaveBeenCalledWith(key);
    });

    it('should throw an error if the file does not exist', async () => {
      const key = 'uploads/non-existent.txt';
      fileStorageMock.deleteFile.mockResolvedValue(undefined);
      try {
        await fileService.deleteFile(key);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
      expect(fileStorageMock.deleteFile).toHaveBeenCalledWith(key);
    });
  });

  describe('deleteFiles', () => {
    it('should delete multiple files and return the result', async () => {
      const keys = ['uploads/1234-5678.txt', 'uploads/8765-4321.txt'];
      fileStorageMock.deleteFiles.mockResolvedValue(undefined);
      const result = await fileService.deleteFiles(keys);
      expect(result).toEqual(undefined);
      expect(fileStorageMock.deleteFiles).toHaveBeenCalledWith(keys);
    });

    it('should throw an error if any of the files do not exist', async () => {
      const keys = ['uploads/1234-5678.txt', 'uploads/non-existent.txt'];
      fileStorageMock.deleteFiles.mockResolvedValue(undefined);
      try {
        await fileService.deleteFiles(keys);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
      expect(fileStorageMock.deleteFiles).toHaveBeenCalledWith(keys);
    });
  });
});
