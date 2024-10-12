import { afterAll, beforeAll } from 'vitest';

import { db, initDb } from '../../src/datastore';

beforeAll(async () => {
  await initDb();
});

afterAll(async () => {
  await db.$transaction([db.address.deleteMany(), db.user.deleteMany()]);
});
