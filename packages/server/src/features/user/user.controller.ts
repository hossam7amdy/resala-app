import {
  DefaultQuerySchema,
  type DeleteUserResponse,
  DeleteUserSchema,
  type GetUserResponse,
  GetUserSchema,
  ListUsersRequest,
  type ListUsersResponse,
  UpdateUserRequest,
  type UpdateUserResponse,
  UpdateUserSchema,
} from '@resala/shared';
import type { Request as ExRequest } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Path,
  Put,
  Queries,
  Request,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa/dist/index.js';

import { db } from '../../datastore/index.js';
import { authorization, authorizeRole } from '../../middlewares/authorization.js';
import { validate } from '../../middlewares/index.js';
import { UserService } from './user.service.js';

@Tags('User')
@Route('api/v1/users')
@Security('JWT_SECRET')
@Middlewares([authorization])
export class UserController extends Controller {
  private readonly userService: UserService;

  constructor() {
    super();
    this.userService = new UserService(db);
  }

  @Get('{userId}')
  @Middlewares([validate(GetUserSchema)])
  public async getUser(@Path() userId: string): Promise<GetUserResponse> {
    const user = await this.userService.find(+userId);

    return { success: true, data: user };
  }

  @Get()
  @Middlewares([validate(DefaultQuerySchema), authorizeRole(['ADMIN', 'MODERATOR'])])
  public async listUsers(
    @Queries() listUserDto: ListUsersRequest['query']
  ): Promise<ListUsersResponse> {
    const query = listUserDto.query ?? '';
    const page = listUserDto.page ?? 1;
    const limit = listUserDto.limit ?? 10;

    const { users, pagination } = await this.userService.list({ page, limit, query });

    return {
      success: true,
      data: { users, pagination },
    };
  }

  @Delete('{userId}')
  @Middlewares([validate(DeleteUserSchema), authorizeRole(['ADMIN'])])
  @SuccessResponse('200', 'User deleted successfully')
  public async deleteUser(@Path() userId: string): Promise<DeleteUserResponse> {
    await this.userService.delete(+userId);

    return { success: true };
  }

  @Put('{userId}')
  @Middlewares([validate(UpdateUserSchema)])
  public async updateUser(
    @Request() req: ExRequest,
    @Path() userId: string,
    @Body() body: UpdateUserRequest['body']
  ): Promise<UpdateUserResponse> {
    const localUser = req.res?.locals.user;

    // Prevent updating the role if the user is not an admin
    if (body.role && localUser.role !== 'ADMIN') {
      delete body.role;
    }

    const user = await this.userService.update(+userId, body);

    return { success: true, data: user };
  }
}
