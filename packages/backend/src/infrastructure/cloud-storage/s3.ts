import type { BlobMetadata, CloudStoragePort } from '@/interfaces';
import type { S3ClientConfig } from '@aws-sdk/client-s3';
import {
  DeleteObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import mime from 'mime';

type S3ServiceConfig = {
  bucketName: string;
  region: string;
  accessKey: string;
  accessSecret: string;
  defaultExpirationInSec?: number;
  endpoint?: string;
  forcePathStyle?: boolean;
};

class S3Adapter implements CloudStoragePort {
  private _s3Client: S3Client;
  private _bucketName: string;
  private _defaultExpirationInSec?: number;

  constructor(readonly config: S3ServiceConfig) {
    this._bucketName = config.bucketName;
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

  async getBlobMetadata(path: string): Promise<BlobMetadata> {
    const command = new HeadObjectCommand({
      Bucket: this._bucketName,
      Key: path,
    });

    const data = await this._s3Client.send(command);

    return {
      key: path,
      size: data.ContentLength!,
      lastModified: data.LastModified!,
      metadata: data.Metadata,
      contentType: data.ContentType,
    };
  }

  async listBlobs(
    prefix?: string,
    _metadataFilter?: Record<string, string>
  ): Promise<BlobMetadata[]> {
    const command = new ListObjectsV2Command({
      Bucket: this._bucketName,
      Prefix: prefix,
      MaxKeys: 1000,
    });

    const { Contents } = await this._s3Client.send(command);

    const validBlobList = Contents?.filter(item => item.Key) ?? [];
    return validBlobList.map(item => ({
      key: item.Key!,
      size: item.Size!,
      contentType: mime.getType(item.Key!),
      lastModified: item.LastModified!,
    }));
  }
}

export { S3Adapter };
