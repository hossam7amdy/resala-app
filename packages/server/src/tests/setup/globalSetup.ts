import { LocalstackContainer } from '@testcontainers/localstack';
import { PostgreSqlContainer } from '@testcontainers/postgresql';

import { execAsync } from '../../utils/execAsync';

export const setup = async () => {
  console.log('🟡 - Waiting for database to be ready...');

  const pgContainer = await new PostgreSqlContainer().start();
  process.env.DATABASE_URL = pgContainer.getConnectionUri();

  await execAsync('yarn db:migrate');

  console.log('🟢 - Database is ready!');

  console.log('🟡 - Waiting for s3 to be ready...');

  const localstackContainer = await new LocalstackContainer().start();
  process.env.S3_BUCKET = 'test';
  process.env.S3_BASE_URL = localstackContainer.getConnectionUri() + '/test';
  process.env.S3_ENDPOINT = localstackContainer.getConnectionUri();
  process.env.S3_REGION = 'us-east-1';
  process.env.AWS_ACCESS_KEY_ID = 'test';
  process.env.AWS_SECRET_ACCESS_KEY = 'test';
  process.env.S3_FORCE_PATH_STYLE = 'true';

  console.log('🟢 - S3 is ready!');

  return async () => {
    console.log('🟡 - Stopping containers...');

    await pgContainer.stop();
    await localstackContainer.stop();

    console.log('🔴 - Stopped containers');
  };
};
