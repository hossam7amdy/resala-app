import type { Configuration } from '@/configuration';
import { PrismaClient } from '@prisma/client';

class PrismaDBConfig extends PrismaClient {
  constructor(config: Configuration) {
    super({ datasourceUrl: config.db.url });
  }
}

export { PrismaDBConfig };
