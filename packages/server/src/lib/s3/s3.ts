import type { S3ClientConfig } from '@aws-sdk/client-s3';
import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { createReadStream } from 'fs';

import type { FileMetadata, IFileStorage } from '../../interfaces/file-storage.js';

export default class S3Service implements IFileStorage {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(
    readonly config: {
      accessKey: string;
      accessSecret: string;
      region: string;
      bucketName: string;
    }
  ) {
    const clientOptions: S3ClientConfig = {
      credentials: {
        accessKeyId: config.accessKey,
        secretAccessKey: config.accessSecret,
      },
      region: config.region,
    };

    this.bucketName = config.bucketName;
    this.s3Client = new S3Client(clientOptions);
  }

  async uploadFile(localFilePath: string, remoteDestination: string): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: remoteDestination,
      Body: createReadStream(localFilePath).on('error', console.error),
    });

    await this.s3Client.send(command);
  }
  async downloadFile(remoteSource: string, localDestination: string): Promise<void> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: remoteSource,
    });

    const { Body } = await this.s3Client.send(command);

    await new Promise((resolve, reject) => {
      const fileStream = createReadStream(localDestination);
      fileStream.on('error', reject);
      Body!.transformToWebStream();
      fileStream.on('close', resolve);
    });
  }
  async deleteFile(remoteFilePath: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: remoteFilePath,
    });

    await this.s3Client.send(command);
  }
  async listFiles(remoteDirectory: string): Promise<string[]> {
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
      Prefix: remoteDirectory,
    });

    const { Contents: contents } = await this.s3Client.send(command);

    return contents!.map(obj => obj.Key!);
  }
  async getFileMetadata(remoteFilePath: string): Promise<FileMetadata> {
    const command = new HeadObjectCommand({
      Bucket: this.bucketName,
      Key: remoteFilePath,
    });
    const obj = await this.s3Client.send(command);

    return {
      size: obj.ContentLength!,
      lastModified: obj.LastModified!,
    };
  }
  async deleteFiles(remoteFilePaths: string[]) {
    const command = new DeleteObjectsCommand({
      Bucket: this.bucketName,
      Delete: {
        Objects: remoteFilePaths.map(path => ({
          Key: path,
        })),
      },
    });

    await this.s3Client.send(command);
  }
}
