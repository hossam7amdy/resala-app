import { authConfig } from '@/configuration/auth';
import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import type { NextServer } from '@aws-amplify/adapter-nextjs';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth/server';

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: authConfig,
  },
});

export const authenticatedUser = async (context: NextServer.Context) => {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async contextSpec => {
      try {
        const session = await fetchAuthSession(contextSpec);
        if (!session.tokens) {
          return null;
        }
        const user = {
          ...(await getCurrentUser(contextSpec)),
          isAdmin: false,
        };
        const groups = session.tokens.accessToken.payload['cognito:groups'];

        user.isAdmin = Boolean(groups && (groups as string).includes('admin'));

        return user;
      } catch (error) {
        return null;
      }
    },
  });
};
