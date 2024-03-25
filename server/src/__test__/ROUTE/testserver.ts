import superset from 'supertest';
import TestAgent from 'supertest/lib/agent';

import { createExpressApp } from '../../app';

let client: TestAgent<superset.Test>;

export async function getTestServer() {
  if (!client) {
    const app = createExpressApp(false);
    client = superset(app);
  }

  return client;
}
