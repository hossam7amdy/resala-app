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
  process.env.S3_BUCKET = 'test';
  process.env.S3_BASE_URL = localstackContainer.getConnectionUri() + '/test';
  process.env.S3_ENDPOINT = localstackContainer.getConnectionUri();
  process.env.S3_REGION = 'us-east-1';
  process.env.AWS_ACCESS_KEY_ID = 'test';
  process.env.AWS_SECRET_ACCESS_KEY = 'test';
  process.env.S3_FORCE_PATH_STYLE = 'true';

  console.log('🟢 - Test containers is ready');

  return async () => {
    await pgContainer.stop();
    await localstackContainer.stop();

    console.log('🔴 - Test containers stopped');
  };
};
