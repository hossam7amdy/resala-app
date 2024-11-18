import type {
  GetUserResponse,
  ListUsersRequest,
  ListUsersResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '@resala/shared';

export class UserService {
  constructor() {}

  async update(
    _id: number,
    _payload: UpdateUserRequest['body']
  ): Promise<UpdateUserResponse['data']> {
    throw new Error('Not implemented');
  }

  async delete(_id: number) {
    throw new Error('Not implemented');
  }

  async find(_id: number): Promise<GetUserResponse['data']> {
    throw new Error('Not implemented');
  }

  async list(_query: ListUsersRequest['query']): Promise<ListUsersResponse['data']> {
    throw new Error('Not implemented');
  }
}
