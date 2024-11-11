import { afterAll, beforeAll } from 'vitest';

import { db, initDb } from '../../src/datastore';
import { hashPassword } from '../../src/lib/password';

beforeAll(async () => {
  await initDb();

  await db.user.createMany({
    data: [
      {
        password: await hashPassword('abcABC@123'),
        email: `test-customer@resala.com`,
        phone: `01500000010`,
        firstName: `Test`,
        lastName: `Customer`,
        role: 'CUSTOMER',
      },
      {
        password: await hashPassword('abcABC@123'),
        email: `test-admin@resala.com`,
        phone: `01500000020`,
        firstName: 'Test',
        lastName: 'Admin',
        role: 'ADMIN',
        isEmailVerified: true,
      },
    ],
  });
});

afterAll(async () => {
  await db.$transaction([
    db.address.deleteMany(),
    db.user.deleteMany(),
    db.product.deleteMany(),
    db.category.deleteMany(),
  ]);
});
