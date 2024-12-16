import type { BlobMetadata, CloudStorage } from '@/interfaces';
import type { S3ClientConfig } from '@aws-sdk/client-s3';
import {
  DeleteObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

type S3ServiceConfig = {
  bucketName: string;
  cdnBaseUrl: string;
  region: string;
  accessKey: string;
  accessSecret: string;
  defaultExpirationInSec?: number;
  endpoint?: string;
  forcePathStyle?: boolean;
};

class S3StorageService implements CloudStorage {
  private _s3Client: S3Client;
  private _cdnBaseUrl: string;
  private _bucketName: string;
  private _defaultExpirationInSec?: number;

  constructor(readonly config: S3ServiceConfig) {
    this._bucketName = config.bucketName;
    this._cdnBaseUrl = config.cdnBaseUrl;
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

  uploadBlob(
    _path: string,
    _data: Buffer | NodeJS.ReadableStream,
    _metadata?: Record<string, string>
  ): Promise<string> {
    throw new Error('Method not implemented.');
  }

  getBlob(_path: string): Promise<NodeJS.ReadableStream> {
    throw new Error('Method not implemented.');
  }

  getPublicUrl(path: string): string {
    return `${this._cdnBaseUrl}/${path}`;
  }

  async generatePresignedUrl(path: string, expirySeconds?: number): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this._bucketName,
      Key: path,
    });

    return getSignedUrl(this._s3Client, command, {
      expiresIn: expirySeconds ?? this._defaultExpirationInSec,
    });
  }

  async deleteBlob(path: string): Promise<boolean> {
    const command = new DeleteObjectCommand({
      Bucket: this._bucketName,
      Key: path,
    });

    const { $metadata } = await this._s3Client.send(command);
    return $metadata.httpStatusCode === 204;
  }

  async blobExists(path: string): Promise<boolean> {
    const command = new HeadObjectCommand({
      Bucket: this._bucketName,
      Key: path,
    });

    const data = await this._s3Client.send(command);
    return data.$metadata.httpStatusCode === 200;
  }

  async listBlobs(
    prefix?: string,
    _metadataFilter?: Record<string, string>
  ): Promise<BlobMetadata[]> {
    const command = new ListObjectsV2Command({
      Bucket: this._bucketName,
      Prefix: prefix,
    });

    const data = await this._s3Client.send(command);

    return (
      data.Contents?.map(item => {
        return {
          key: item.Key!,
          size: item.Size!,
          url: this.getPublicUrl(item.Key!),
          lastModified: item.LastModified!,
        };
      }) ?? []
    );
  }
}

export { S3StorageService };
