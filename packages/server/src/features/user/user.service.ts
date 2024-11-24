import {
  AdminDeleteUserCommand,
  AdminGetUserCommand,
  AdminListGroupsForUserCommand,
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient,
  ListUsersCommand,
  type ListUsersCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import type {
  GetUserResponse,
  ListUsersRequest,
  ListUsersResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '@resala/shared';

import type { Configuration } from '../../configuration/index.js';

export class UserService {
  private client: CognitoIdentityProviderClient;

  constructor(private configuration: Configuration) {
    this.client = new CognitoIdentityProviderClient({
      region: configuration.aws.region,
      credentials: {
        accessKeyId: configuration.aws.accessKey,
        secretAccessKey: configuration.aws.accessSecret,
      },
    });
  }

  async update(
    id: string,
    payload: UpdateUserRequest['body']
  ): Promise<UpdateUserResponse['data']> {
    const { firstName, lastName, phone } = payload;

    const input = {
      UserAttributes: [
        {
          Name: 'given_name',
          Value: firstName,
        },
        {
          Name: 'family_name',
          Value: lastName,
        },
        {
          Name: 'phone_number',
          Value: phone,
        },
      ],
      UserPoolId: this.configuration.aws.auth.userPoolId,
      Username: id,
    };

    const command = new AdminUpdateUserAttributesCommand(input);
    await this.client.send(command);

    return payload as UpdateUserResponse['data'];
  }

  async delete(id: string) {
    const input = {
      UserPoolId: this.configuration.aws.auth.userPoolId,
      Username: id,
    };

    const command = new AdminDeleteUserCommand(input);
    await this.client.send(command);
  }

  async find(id: string): Promise<GetUserResponse['data']> {
    const input = {
      UserPoolId: this.configuration.aws.auth.userPoolId,
      Username: id,
    };

    const command = new AdminGetUserCommand(input);
    const response = await this.client.send(command);

    return {
      id: response.Username ?? '',
      email: response.UserAttributes?.find(attr => attr.Name === 'email')?.Value ?? '',
      phone: response.UserAttributes?.find(attr => attr.Name === 'phone_number')?.Value ?? '',
      firstName: response.UserAttributes?.find(attr => attr.Name === 'given_name')?.Value ?? '',
      lastName: response.UserAttributes?.find(attr => attr.Name === 'family_name')?.Value ?? '',
      createdAt: response.UserCreateDate?.toISOString() as never,
      updatedAt: response.UserLastModifiedDate?.toISOString() as never,
      isEmailVerified: response.UserStatus === 'CONFIRMED',
      isPhoneVerified:
        response.UserAttributes?.find(attr => attr.Name === 'phone_number_verified')?.Value ===
        'true',
      lastLogin: response.UserAttributes?.find(attr => attr.Name === 'last_login')?.Value as never,
    };
  }

  async list({
    page,
    limit = 10,
    search,
  }: ListUsersRequest['query']): Promise<ListUsersResponse['data']> {
    const input: ListUsersCommandInput = {
      UserPoolId: this.configuration.aws.auth.userPoolId,
      Limit: limit + 1,
      Filter: search ? `email ^= "${search}"` : undefined,
    };

    const command = new ListUsersCommand(input);
    const response = await this.client.send(command);

    console.log(response.PaginationToken);

    return {
      users: (response.Users || []).map(user => ({
        id: user.Username ?? '',
        email: user.Attributes?.find(attr => attr.Name === 'email')?.Value as never,
        phone: user.Attributes?.find(attr => attr.Name === 'phone_number')?.Value as never,
        firstName: user.Attributes?.find(attr => attr.Name === 'given_name')?.Value as never,
        lastName: user.Attributes?.find(attr => attr.Name === 'family_name')?.Value as never,
        createdAt: user.UserCreateDate?.toISOString() as never,
        updatedAt: user.UserLastModifiedDate?.toISOString() as never,
        isEmailVerified: user.UserStatus === 'CONFIRMED',
        isPhoneVerified:
          user.Attributes?.find(attr => attr.Name === 'phone_number_verified')?.Value === 'true',
        lastLogin: user.UserLastModifiedDate?.toISOString() as never,
      })),
      pagination: {
        page: page ?? 1,
        limit,
        total: (response.Users?.length ?? 0) > limit ? limit + 1 : limit,
      },
    };
  }

  async getGroups(userId: string) {
    const input = {
      UserPoolId: this.configuration.aws.auth.userPoolId,
      Username: userId,
    };

    const command = new AdminListGroupsForUserCommand(input);
    const response = await this.client.send(command);

    return response.Groups?.map(group => group.GroupName);
  }
}
