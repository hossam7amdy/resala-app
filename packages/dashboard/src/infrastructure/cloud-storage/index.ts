import type { Configuration } from '@/configuration';

import { S3Service } from './s3';

class CloudStorage extends S3Service {
  constructor(config: Configuration) {
    super({
      region: config.aws.region,
      accessKey: config.aws.accessKey,
      accessSecret: config.aws.accessSecret,
      bucketName: config.aws.s3.bucketName,
      cdnDomain: config.cdnDomain,
      defaultExpirationInSec: config.aws.s3.defaultExpirationInSec,
      endpoint: config.aws.s3.endpoint,
      forcePathStyle: config.aws.s3.forcePathStyle,
    });
  }
}

export { CloudStorage };
