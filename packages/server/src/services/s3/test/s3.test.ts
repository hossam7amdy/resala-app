import { beforeEach, describe, expect, it } from 'vitest';

import { configuration } from '../../../configuration';
import { S3Service } from '../s3';

describe('S3Service', () => {
  let s3Service: S3Service;

  const mockBucketName = 'mock-test-bucket';
  const fileKey = Date.now().toString();
  const mockMulterFile = { buffer: Buffer.from('test') } as Express.Multer.File;

  beforeEach(async () => {
    const bucketName = 'test';
    s3Service = new S3Service(undefined, undefined, bucketName);
    await s3Service.createBucketIfNotExist(bucketName);
  });

  describe('uploadFile', () => {
    it('should upload the file and return the public URL', async () => {
      const url = await s3Service.upload(mockMulterFile, fileKey);

      expect(url).toBeDefined();
      expect(url).toBe(`${configuration.blobStorage.baseUrl}/${fileKey}`);
      expect(await s3Service.exists(fileKey)).toBe(true);
    });
  });

  describe('createBucketIfNotExist', () => {
    it('should create a new bucket if it does not exist', async () => {
      const result = await s3Service.createBucketIfNotExist(mockBucketName);
      expect(result).toBe('CREATED');
    });

    it('should not create a new bucket if it already exists', async () => {
      const result = await s3Service.createBucketIfNotExist(mockBucketName);
      expect(result).toBe('EXIST');
    });
  });

  describe('deleteBucket', () => {
    it('should delete the bucket', async () => {
      const result = await s3Service.deleteBucket(mockBucketName);
      expect(result).toBe(true);
    });
  });

  describe('deleteFile', () => {
    it('should delete the specified file', async () => {
      const url = await s3Service.upload(mockMulterFile, fileKey);
      expect(url).toBeDefined();
      await s3Service.delete(url);
      expect(await s3Service.exists(url)).toBe(false);
    });
  });

  describe('deleteFiles', () => {
    it('should delete multiple files', async () => {
      const urls = await Promise.all([
        s3Service.upload(mockMulterFile, fileKey),
        s3Service.upload(mockMulterFile, fileKey),
      ]);
      await s3Service.deleteMany(urls);
      expect(await s3Service.exists(urls[0])).toBe(false);
      expect(await s3Service.exists(urls[1])).toBe(false);
    });
  });
});
