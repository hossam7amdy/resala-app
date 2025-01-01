import type { Configuration } from '@/configuration';
import { PrismaClient } from '@prisma/client';

class PrismaDBConfig extends PrismaClient {
  constructor(config: Configuration) {
    super({ datasources: { db: { url: config.db.url } } });
  }
}

export { PrismaDBConfig };
