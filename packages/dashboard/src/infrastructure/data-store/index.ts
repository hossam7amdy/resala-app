import type { Configuration } from '@/configuration';
import { PrismaClient } from '@prisma/client';

class Datastore extends PrismaClient {
  constructor(config: Configuration) {
    super({ datasourceUrl: config.db.url });
  }
}

export { Datastore };
