import { PrismaClient } from '@prisma/client';
import { afterAll, beforeAll } from 'vitest';

import { execAsync } from '../../utils/execAsync.js';

beforeAll(async () => {
  await execAsync('yarn prisma db seed');
});

afterAll(async () => {
  const prisma = new PrismaClient();

  try {
    const tablenames = await prisma.$queryRaw<
      Array<{ tablename: string }>
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

    const tables = tablenames
      .map(({ tablename }) => tablename)
      .filter(name => name !== '_prisma_migrations')
      .map(name => `"public"."${name}"`)
      .join(', ');

    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
});
