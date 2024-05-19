import {
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  HeadBucketCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutBucketPolicyCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { S3Client } from '@aws-sdk/client-s3';

import type { FileMetadata, IFileStorage } from '../interfaces/file-storage.js';

export default class S3Service implements IFileStorage {
  private readonly bucketName: string;
  private readonly client: S3Client;

  constructor() {
    this.bucketName = process.env.S3_BUCKET;

    this.client = new S3Client({
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      endpoint: process.env.S3_ENDPOINT,
      forcePathStyle: process.env.NODE_ENV !== 'production',
    });

    (async () => {
      await this.createBucketIfNotExist(process.env.S3_BUCKET);
      await this.makeBucketPublicRead(process.env.S3_BUCKET);
    })();
  }

  async createBucketIfNotExist(bucketName: string): Promise<'CREATED' | 'EXIST'> {
    try {
      const command = new HeadBucketCommand({ Bucket: bucketName });
      await this.client.send(command);

      return 'EXIST';
    } catch (err) {
      const command = new CreateBucketCommand({ Bucket: bucketName });
      await this.client.send(command);

      return 'CREATED';
    }
  }

  downloadFile(filename: string): Promise<Buffer> {
    console.log('Downloading file', filename);
    throw new Error('Method not implemented.');
  }
  async uploadFile(fileBuffer: Buffer, filename: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: filename,
      Body: fileBuffer,
      ACL: 'public-read',
    });

    await this.client.send(command);
    return this.getPublicUrl(filename);
  }
  async deleteFile(path: string): Promise<void> {
    const filename = this.getFilenameFromUrl(path);

    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: filename,
    });

    await this.client.send(command);
  }
  async listFiles(directory: string): Promise<string[]> {
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
      Prefix: directory,
    });

    const { Contents: contents } = await this.client.send(command);

    return contents!.map(obj => obj.Key!);
  }
  async getFileMetadata(path: string): Promise<FileMetadata> {
    const filename = this.getFilenameFromUrl(path);

    const command = new HeadObjectCommand({
      Bucket: this.bucketName,
      Key: filename,
    });
    const obj = await this.client.send(command);

    return {
      size: obj.ContentLength!,
      lastModified: obj.LastModified!,
    };
  }
  async deleteFiles(paths: string[]) {
    const command = new DeleteObjectsCommand({
      Bucket: this.bucketName,
      Delete: {
        Objects: paths.map(path => ({ Key: this.getFilenameFromUrl(path) })),
      },
    });

    await this.client.send(command);
  }

  private getPublicUrl(filename: string) {
    return `${process.env.S3_BASE_URL}/${filename}`;
  }
  private getFilenameFromUrl(url: string) {
    return url.replace(`${process.env.S3_BASE_URL}/`, '');
  }

  private async makeBucketPublicRead(bucketName: string) {
    const command = new PutBucketPolicyCommand({
      Bucket: bucketName,
      Policy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Sid: 'PublicReadGetObject',
            Effect: 'Allow',
            Principal: '*',
            Action: 's3:GetObject',
            Resource: `arn:aws:s3:::${bucketName}/*`,
          },
        ],
      }),
    });

    await this.client.send(command);
  }
}
