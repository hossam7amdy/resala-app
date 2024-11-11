/* eslint-disable no-console */
import { LocalstackContainer } from '@testcontainers/localstack';
import { PostgreSqlContainer } from '@testcontainers/postgresql';

import { execAsync } from '../../src/utils/execAsync';

export const setup = async () => {
  console.log('🟡 - Waiting for test containers to be ready...');

  const pgContainer = await new PostgreSqlContainer().start();
  process.env.DATABASE_URL = pgContainer.getConnectionUri();

  await execAsync('yarn db:migrate');

  const localstackContainer = await new LocalstackContainer().start();
  process.env.S3_BASE_URL = localstackContainer.getConnectionUri() + '/test';
  process.env.S3_ENDPOINT = process.env.SES_ENDPOINT = localstackContainer.getConnectionUri();

  await localstackContainer.exec('awslocal s3api create-bucket --bucket test');
  await localstackContainer.exec('awslocal s3api put-bucket-acl --bucket test --acl public-read');
  await localstackContainer.exec(
    'awslocal ses verify-email-identity --email-address no-reply@resala.test --region us-east-1'
  );

  console.log('🟢 - Test containers is ready');

  return async () => {
    await pgContainer.stop();
    await localstackContainer.stop();

    console.log('🔴 - Test containers stopped');
  };
};
