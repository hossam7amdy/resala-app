import { exec } from 'child_process';
import { afterAll, beforeAll } from 'vitest';

import prisma from '../lib/prisma';

const resetDatabase = () => {
  return new Promise((resolve, reject) => {
    exec('yarn prisma db seed', (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      }
      console.log('stderr', stderr);
      return resolve(stdout);
    });
  });
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
