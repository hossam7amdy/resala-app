import {
  CreateBucketCommand,
  DeleteBucketCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  HeadBucketCommand,
  HeadObjectCommand,
  PutBucketPolicyCommand,
  PutObjectCommand,
  S3Client,
  type S3ClientConfig,
} from '@aws-sdk/client-s3';

import { configuration } from '../../configuration/index.js';

const defaultOptions: S3ClientConfig = {
  region: configuration.blobStorage.region,
  endpoint: configuration.blobStorage.endpoint,
  forcePathStyle: configuration.blobStorage.forcePathStyle,
  credentials: {
    accessKeyId: configuration.blobStorage.accessKey,
    secretAccessKey: configuration.blobStorage.accessSecret,
  },
};

export class S3Service {
  private readonly bucketName: string;
  private readonly baseUrl: string;
  private readonly client: S3Client;

  constructor(
    config: S3ClientConfig = defaultOptions,
    baseUrl: string = configuration.blobStorage.baseUrl,
    bucketName: string = configuration.blobStorage.bucketName
  ) {
    this.baseUrl = baseUrl;
    this.bucketName = bucketName;
    this.client = new S3Client(config);

    this.init();
  }

  async init() {
    await this.createBucketIfNotExist(this.bucketName);
    await this.makeBucketPublicRead(this.bucketName);
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

  async deleteBucket(bucketName: string): Promise<boolean> {
    const command = new DeleteBucketCommand({ Bucket: bucketName });
    const response = await this.client.send(command);

    return response.$metadata.httpStatusCode === 204;
  }

  async exists(key: string): Promise<boolean> {
    const command = new HeadObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    try {
      await this.client.send(command);
      return true;
    } catch (err) {
      return false;
    }
  }

  async upload(file: Express.Multer.File, key: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
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
    return `${this.baseUrl}/${key}`;
  }
  private getFilenameFromUrl(url: string) {
    return url.replace(`${this.baseUrl}/`, '');
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
