import { PostgreSqlContainer } from '@testcontainers/postgresql';

import { initDb } from '../../datastore';
import { execAsync } from '../../utils/execAsync';

export const setup = async () => {
  console.log('🟡 - Waiting for database to be ready...');

  const pgContainer = await new PostgreSqlContainer().start();
  process.env.DATABASE_URL = pgContainer.getConnectionUri();

  await execAsync('yarn db:migrate');

  console.log('🟢 - Database is ready!');

  return async () => {
    await pgContainer.stop();
  };
};
