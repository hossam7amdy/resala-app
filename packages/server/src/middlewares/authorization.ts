import {
  AdminListGroupsForUserCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';
import { Role, type RoleType } from '@resala/shared';
import type { RequestHandler } from 'express';

import { configuration } from '../configuration/index.js';
import { ForbiddenError } from '../errors/api.errors.js';

const getUserGroups = async (userId: string) => {
  const client = new CognitoIdentityProviderClient({
    region: configuration.aws.region,
    credentials: {
      accessKeyId: configuration.aws.accessKey,
      secretAccessKey: configuration.aws.accessSecret,
    },
  });

  const input = {
    UserPoolId: configuration.aws.auth.userPoolId,
    Username: userId,
  };

  const command = new AdminListGroupsForUserCommand(input);
  const response = await client.send(command);

  return response.Groups?.map(group => group.GroupName);
};

export const authorization: RequestHandler = (req, res, next) => {
  const { id, role } = res.locals.user ?? {};
  const userId = req.params.userId ?? req.body.userId ?? req.query.userId;

  const notAuthorized = userId && userId.toString() !== id?.toString();
  const notAdmin = ![Role.ADMIN, Role.MODERATOR].includes(role);

  if (notAuthorized && notAdmin) {
    throw new ForbiddenError();
  }

  next();
};

export const authorizeRole = (roles: RoleType[]): RequestHandler => {
  return async (_req, res, next) => {
    try {
      const groups = await getUserGroups(res.locals.user.sub);

      const hasRole = roles.some(role => groups?.includes(role.toLowerCase()));
      if (!hasRole) {
        throw new Error('User does not have the required role');
      }
    } catch (e) {
      return next(new ForbiddenError((e as Error).message));
    }

    next();
  };
};
