import {
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  HeadBucketCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutBucketPolicyCommand,
  PutObjectCommand,
  S3Client,
  type S3ClientConfig,
} from '@aws-sdk/client-s3';

import type { FileMetadata, IFileStorage } from '../../interfaces/index.js';

export default class S3StorageService implements IFileStorage {
  private readonly bucketName: string;
  private readonly client: S3Client;

  constructor(
    clientConfig: S3ClientConfig = {
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      endpoint: process.env.S3_ENDPOINT,
      forcePathStyle: process.env.NODE_ENV !== 'production',
    },
    bucketName: string = process.env.S3_BUCKET
  ) {
    this.bucketName = bucketName;
    this.client = new S3Client(clientConfig);

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

  // eslint-disable-next-line no-unused-vars
  download(_key: string): Promise<Buffer> {
    throw new Error('Method not implemented.');
  }
  async upload(fileBuffer: Buffer, key: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: fileBuffer,
      ACL: 'public-read',
    });

    await this.client.send(command);
    return this.getPublicUrl(key);
  }
  async delete(path: string): Promise<void> {
    const key = this.getFilenameFromUrl(path);

    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    await this.client.send(command);
  }
  async list(directory: string): Promise<string[]> {
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
      Prefix: directory,
    });

    const { Contents: contents } = await this.client.send(command);

    return contents!.map(obj => obj.Key!);
  }
  async getMetadata(path: string): Promise<FileMetadata> {
    const key = this.getFilenameFromUrl(path);

    const command = new HeadObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    const obj = await this.client.send(command);

    return {
      size: obj.ContentLength!,
      lastModified: obj.LastModified!,
    };
  }
  async deleteMany(keys: string[]) {
    const command = new DeleteObjectsCommand({
      Bucket: this.bucketName,
      Delete: {
        Objects: keys.map(key => ({ Key: key })),
      },
    });

    await this.client.send(command);
  }

  private getPublicUrl(key: string) {
    return `${process.env.S3_BASE_URL}/${key}`;
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
