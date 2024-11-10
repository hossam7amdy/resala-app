import { PrismaClient } from '@prisma/client';

export class DataStore extends PrismaClient {}

export let db: DataStore;

export const initDb = async (datasourceUrl?: string) => {
  if (!db) {
    db = new DataStore({
      datasourceUrl,
      omit: {
        user: {
          password: true,
        },
      },
    });

    await db.$connect();
  }

  return db;
};
