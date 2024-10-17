import superset from 'supertest';
import type TestAgent from 'supertest/lib/agent.js';

import { createExpressApp } from '../../src/app.js';

let client: TestAgent<superset.Test>;

export const getTestServer = () => {
  if (!client) {
    const app = createExpressApp(false);
    client = superset(app);
  }

  return client;
};
