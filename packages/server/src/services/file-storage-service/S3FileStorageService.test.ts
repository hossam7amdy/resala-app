import {
  S3Client as Client,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  HeadBucketCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutBucketPolicyCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { S3FileStorageService } from '../index.js';

vi.mock('@aws-sdk/client-s3', () => {
  const mS3Client = {
    send: vi.fn(),
  };
  return {
    S3Client: vi.fn(() => mS3Client),
    CreateBucketCommand: vi.fn(),
    DeleteObjectCommand: vi.fn(),
    DeleteObjectsCommand: vi.fn(),
    HeadBucketCommand: vi.fn(),
    HeadObjectCommand: vi.fn(),
    ListObjectsV2Command: vi.fn(),
    PutBucketPolicyCommand: vi.fn(),
    PutObjectCommand: vi.fn(),
  };
});

describe('S3FileStorageService', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let s3Client: any;
  let s3ClientWrapper: S3FileStorageService;

  const mockBucketName = 'test-bucket';
  const mockFileBuffer = Buffer.from('test-file');
  const mockFilename = 'test-file.txt';
  const mockPath = 'https://s3.amazonaws.com/test-bucket/test-file.txt';
  const mockS3BaseUrl = 'https://s3.amazonaws.com/test-bucket';

  beforeEach(() => {
    process.env.S3_BUCKET = mockBucketName;
    process.env.S3_BASE_URL = mockS3BaseUrl;
    process.env.S3_REGION = 'us-west-2';
    process.env.AWS_ACCESS_KEY_ID = 'fake-access-key-id';
    process.env.AWS_SECRET_ACCESS_KEY = 'fake-secret-access-key';

    s3Client = new Client();
    s3ClientWrapper = new S3FileStorageService();
  });

  describe('createBucketIfNotExist', () => {
    it('should return "EXIST" if the bucket exists', async () => {
      s3Client.send.mockResolvedValueOnce({});

      const result = await s3ClientWrapper.createBucketIfNotExist(mockBucketName);
      expect(result).toBe('EXIST');
      expect(HeadBucketCommand).toHaveBeenCalledWith({ Bucket: mockBucketName });
    });

    it('should return "CREATED" if the bucket does not exist', async () => {
      s3Client.send.mockRejectedValueOnce(new Error('NotFound'));
      s3Client.send.mockResolvedValueOnce({});

      const result = await s3ClientWrapper.createBucketIfNotExist(mockBucketName);
      expect(result).toBe('CREATED');
      expect(CreateBucketCommand).toHaveBeenCalledWith({ Bucket: mockBucketName });
    });
  });

  describe('uploadFile', () => {
    it('should upload the file and return the public URL', async () => {
      s3Client.send.mockResolvedValueOnce({});

      const result = await s3ClientWrapper.upload(mockFileBuffer, mockFilename);
      expect(result).toBe(`${mockS3BaseUrl}/${mockFilename}`);
      expect(PutObjectCommand).toHaveBeenCalledWith({
        Bucket: mockBucketName,
        Key: mockFilename,
        Body: mockFileBuffer,
        ACL: 'public-read',
      });
    });
  });

  describe('deleteFile', () => {
    it('should delete the specified file', async () => {
      s3Client.send.mockResolvedValueOnce({});

      await s3ClientWrapper.delete(mockPath);
      expect(DeleteObjectCommand).toHaveBeenCalledWith({
        Bucket: mockBucketName,
        Key: mockFilename,
      });
    });
  });

  describe('listFiles', () => {
    it('should list files in the specified directory', async () => {
      const mockFiles = [{ Key: 'file1.txt' }, { Key: 'file2.txt' }];
      s3Client.send.mockResolvedValueOnce({ Contents: mockFiles });

      const result = await s3ClientWrapper.list('directory');
      expect(result).toEqual(['file1.txt', 'file2.txt']);
      expect(ListObjectsV2Command).toHaveBeenCalledWith({
        Bucket: mockBucketName,
        Prefix: 'directory',
      });
    });
  });

  describe('getFileMetadata', () => {
    it('should return file metadata', async () => {
      const mockMetadata = {
        ContentLength: 12345,
        LastModified: new Date(),
      };
      s3Client.send.mockResolvedValueOnce(mockMetadata);

      const result = await s3ClientWrapper.getMetadata(mockPath);
      expect(result).toEqual({
        size: mockMetadata.ContentLength,
        lastModified: mockMetadata.LastModified,
      });
      expect(HeadObjectCommand).toHaveBeenCalledWith({
        Bucket: mockBucketName,
        Key: mockFilename,
      });
    });
  });

  describe('deleteFiles', () => {
    it('should delete multiple files', async () => {
      const paths = ['file1.txt', 'file2.txt'];
      s3Client.send.mockResolvedValueOnce({});

      await s3ClientWrapper.deleteMany(paths);
      expect(DeleteObjectsCommand).toHaveBeenCalledWith({
        Bucket: mockBucketName,
        Delete: {
          Objects: paths.map(path => ({ Key: path })),
        },
      });
    });
  });

  describe('makeBucketPublicRead', () => {
    it('should set bucket policy to public read', async () => {
      s3Client.send.mockResolvedValueOnce({});

      await s3ClientWrapper['makeBucketPublicRead'](mockBucketName);
      expect(PutBucketPolicyCommand).toHaveBeenCalledWith({
        Bucket: mockBucketName,
        Policy: JSON.stringify({
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'PublicReadGetObject',
              Effect: 'Allow',
              Principal: '*',
              Action: 's3:GetObject',
              Resource: `arn:aws:s3:::${mockBucketName}/*`,
            },
          ],
        }),
      });
    });
  });
});
