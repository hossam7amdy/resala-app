import { afterAll, beforeAll } from 'vitest';

import prisma from '../../lib/prisma';
import { execAsync } from '../../utils/execAsync.js';

const resetDatabase = async () => {
  await execAsync('yarn prisma db seed');
};

beforeAll(async () => {
  await resetDatabase();
});

afterAll(async () => {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter(name => name !== '_prisma_migrations')
    .map(name => `"public"."${name}"`)
    .join(', ');

  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
});
