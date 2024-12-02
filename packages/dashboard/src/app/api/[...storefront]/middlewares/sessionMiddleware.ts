import { auth } from '@/lib/auth';
import type { Context, Next } from 'hono';

export const parseSession = async (c: Context, next: Next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (session) {
    c.set('user', session.user);
    c.set('session', session.session);
  }

  return next();
};

export const enforceSession = async (c: Context, next: Next) => {
  if (!c.var.user) {
    return c.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return next();
};
