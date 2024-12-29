import { PrismaClient } from '@prisma/client';

const DataStoreSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  dbGlobal: ReturnType<typeof DataStoreSingleton>;
} & typeof global;

export const db = globalThis.dbGlobal ?? DataStoreSingleton();
export type DataStore = PrismaClient;

if (process.env.NODE_ENV !== 'production') globalThis.dbGlobal = db;
