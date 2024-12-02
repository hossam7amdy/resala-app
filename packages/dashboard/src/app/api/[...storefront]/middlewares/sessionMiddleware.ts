import { auth } from '@/lib/auth';
import { createMiddleware } from 'hono/factory';

import type { Env } from '../types';

export const parseSession = createMiddleware<Env>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (session) {
    c.set('user', session.user);
    c.set('session', session.session);
  }

  return next();
});

export const enforceSession = createMiddleware<Env>(async (c, next) => {
  if (!c.var.user) {
    return c.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return next();
});
