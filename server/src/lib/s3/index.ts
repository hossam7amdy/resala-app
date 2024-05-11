import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createReadStream } from 'fs';

import { ENV } from '../../config/env.js';
import { logger } from '../logger/logger.js';

const s3Client = new S3Client({
  region: ENV.S3_BUCKET_REGION!,
  credentials: {
    accessKeyId: ENV.S3_ACCESS_KEY_ID!,
    secretAccessKey: ENV.S3_SECRET_ACCESS_KEY!,
  },
});

async function uploadS3Object(file: Express.Multer.File) {
  const key = `resala/${file.filename}`;
  const uploadParams = {
    Bucket: ENV.S3_BUCKET_NAME,
    Key: key,
    Body: createReadStream(file.path).on('error', err => logger.warn(err)),
  };

  await s3Client.send(new PutObjectCommand(uploadParams));

  return {
    key: key,
    url: `${ENV.S3_CLOUDFRONT_DOMAIN}/${key}`,
  };
}

function deleteS3Object(url: string) {
  const key = url.split('/').pop() as string;

  const params = {
    Bucket: ENV.S3_BUCKET_NAME,
    Key: key,
  };

  return s3Client.send(new DeleteObjectCommand(params));
}

export const s3Service = Object.freeze({
  uploadS3Object,
  deleteS3Object,
});
