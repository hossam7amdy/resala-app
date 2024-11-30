import type { Configuration } from '@/configuration';
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
} from '@aws-sdk/client-s3';

export class S3Service {
  private readonly bucketName: string;
  private readonly baseUrl: string;
  private readonly client: S3Client;

  constructor(config: Configuration) {
    this.baseUrl = config.aws.s3.baseUrl;
    this.bucketName = config.aws.s3.bucketName;
    this.client = new S3Client({
      region: config.aws.region,
      credentials: {
        accessKeyId: config.aws.accessKey,
        secretAccessKey: config.aws.accessSecret,
      },
    });
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

  async upload(file: File, key: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: Buffer.from(await file.arrayBuffer()),
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

  async makeBucketPublicRead(bucketName: string) {
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

export default S3Service;
