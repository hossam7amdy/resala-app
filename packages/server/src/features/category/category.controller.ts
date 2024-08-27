import {
  type CreateCategoryRequest,
  type CreateCategoryResponse,
  CreateCategorySchema,
  type DeleteCategoryResponse,
  DeleteCategorySchema,
  type GetCategoryResponse,
  GetCategorySchema,
  type ListCategoriesResponse,
  type UpdateCategoryRequest,
  type UpdateCategoryResponse,
  UpdateCategorySchema,
} from '@resala/shared';
import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa/dist/index.js';

import { db } from '../../datastore/index.js';
import { authorizeRole } from '../../middlewares/authorization.js';
import { validate } from '../../middlewares/validateHandler.js';
import { CategoryService } from './category.service.js';

@Tags('Category')
@Route('api/v1/categories')
export class CategoryController extends Controller {
  private readonly categoryService: CategoryService;

  constructor() {
    super();
    this.categoryService = new CategoryService(db);
  }

  @Get('{categoryId}')
  @Middlewares([validate(GetCategorySchema)])
  public async get(@Path() categoryId: string): Promise<GetCategoryResponse> {
    const category = await this.categoryService.find(+categoryId);

    return { success: true, data: category };
  }

  @Get()
  public async list(): Promise<ListCategoriesResponse> {
    const categories = await this.categoryService.list();

    return { success: true, data: categories };
  }

  /** Create a new category, only admins can create categories */
  @Post()
  @SuccessResponse('201', 'Category created')
  @Security('JWT_SECRET')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR']), validate(CreateCategorySchema)])
  public async create(
    @Body() body: CreateCategoryRequest['body']
  ): Promise<CreateCategoryResponse> {
    const category = await this.categoryService.create(body);

    return { success: true, data: category };
  }

  /** Update a category, only admins can update categories */
  @Put('{categoryId}')
  @Security('JWT_SECRET')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR']), validate(UpdateCategorySchema)])
  public async update(
    @Path() categoryId: string,
    @Body() body: UpdateCategoryRequest['body']
  ): Promise<UpdateCategoryResponse> {
    const category = await this.categoryService.update(+categoryId, body);

    return { success: true, data: category };
  }

  /** Delete a category, only admins can delete categories */
  @Delete('{categoryId}')
  @Security('JWT_SECRET')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR']), validate(DeleteCategorySchema)])
  public async delete(@Path() categoryId: string): Promise<DeleteCategoryResponse> {
    const category = await this.categoryService.delete(+categoryId);

    return { success: true, data: category };
  }
}
