import superset from 'supertest';
import type TestAgent from 'supertest/lib/agent.js';

import { createExpressApp } from '../app.js';

let client: TestAgent<superset.Test>;

export const getTestServer = async () => {
  if (!client) {
    const app = createExpressApp(false);
    client = superset(app);
  }

  return client;
};
