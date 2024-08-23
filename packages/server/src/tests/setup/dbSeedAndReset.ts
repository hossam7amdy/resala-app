import { afterAll, beforeAll } from 'vitest';

import { DataStore } from '../../datastore/index.js';
import { execAsync } from '../../utils/execAsync.js';

beforeAll(async () => {
  await execAsync('yarn db:seed');
});

afterAll(async () => {
  const db = new DataStore();

  try {
    const tablenames = await db.$queryRaw<
      Array<{ tablename: string }>
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

    const tables = tablenames
      .map(({ tablename }) => tablename)
      .filter(name => name !== '_prisma_migrations')
      .map(name => `"public"."${name}"`)
      .join(', ');

    await db.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
  } catch (error) {
    console.error(error);
  } finally {
    await db.$disconnect();
  }
});
