import type {
  CreateCategoryRequest,
  CreateCategoryResponse,
  DeleteCategoryRequest,
  DeleteCategoryResponse,
  GetCategoryRequest,
  GetCategoryResponse,
  ListCategoriesRequest,
  ListCategoriesResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
} from '@resala/shared';

import type { ExpressHandler, ExpressHandlerWithParams, LocalUser } from '../../types/index.js';

export type GetCategory = ExpressHandlerWithParams<
  GetCategoryRequest['params'],
  undefined,
  GetCategoryResponse,
  undefined,
  LocalUser
>;

export type ListCategories = ExpressHandler<
  undefined,
  ListCategoriesResponse,
  ListCategoriesRequest['query'],
  LocalUser
>;

export type CreateCategory = ExpressHandler<
  CreateCategoryRequest['body'],
  CreateCategoryResponse,
  undefined,
  LocalUser
>;

export type UpdateCategory = ExpressHandlerWithParams<
  UpdateCategoryRequest['params'],
  UpdateCategoryRequest['body'],
  UpdateCategoryResponse,
  undefined,
  LocalUser
>;

export type DeleteCategory = ExpressHandlerWithParams<
  DeleteCategoryRequest['params'],
  undefined,
  DeleteCategoryResponse,
  undefined,
  LocalUser
>;

export interface ICategoryController {
  getCategory: GetCategory;
  listCategories: ListCategories;
  createCategory: CreateCategory;
  updateCategory: UpdateCategory;
  deleteCategory: DeleteCategory;
}
