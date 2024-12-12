import type { Session, User } from 'better-auth';
import type { Context } from 'hono';

export type Env = {
  Variables: {
    user: User;
    session: Session;
  };
};

export type HonoCtx = Context<Env>;
