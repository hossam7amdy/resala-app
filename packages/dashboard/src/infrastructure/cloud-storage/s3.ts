import type { S3ClientConfig } from '@aws-sdk/client-s3';
import { DeleteObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

type S3ServiceConfig = {
  bucketName: string;
  cdnDomain: string;
  region: string;
  accessKey: string;
  accessSecret: string;
  defaultExpirationInSec?: number;
  endpoint?: string;
  forcePathStyle?: boolean;
};

class S3Service {
  private _s3Client: S3Client;
  private _cdnDomain: string;
  private _bucketName: string;
  private _defaultExpirationInSec?: number;

  constructor(readonly config: S3ServiceConfig) {
    this._bucketName = config.bucketName;
    this._cdnDomain = config.cdnDomain;
    this._defaultExpirationInSec = config.defaultExpirationInSec;

    const clientOptions: S3ClientConfig = {
      region: config.region,
      credentials: {
        accessKeyId: config.accessKey,
        secretAccessKey: config.accessSecret,
      },
      endpoint: config.endpoint,
      forcePathStyle: config.forcePathStyle,
    };

    this._s3Client = new S3Client(clientOptions);
  }

  getKeyFromPublicUrl(url: string): string {
    return url.replace(`${this._cdnDomain}/`, '');
  }

  getPublicUrl(key: string): string {
    const publicUrl = `${this._cdnDomain}/${key}`;
    return publicUrl;
  }

  async getUploadURL(blobName: string, expirationInSec?: number): Promise<string> {
    const command = new PutObjectCommand({ Bucket: this._bucketName, Key: blobName });

    return getSignedUrl(this._s3Client, command, {
      expiresIn: expirationInSec ?? this._defaultExpirationInSec,
    });
  }

  async deleteObjects(urls: string[]): Promise<void> {
    const command = new DeleteObjectsCommand({
      Bucket: this._bucketName,
      Delete: {
        Objects: urls.map(url => ({
          Key: this.getKeyFromPublicUrl(url),
        })),
      },
    });

    await this._s3Client.send(command);
  }
}

export { S3Service };
