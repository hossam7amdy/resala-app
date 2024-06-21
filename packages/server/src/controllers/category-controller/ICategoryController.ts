import type {
  CreateCategoryRequest,
  CreateCategoryResponse,
  DeleteCategoryRequest,
  DeleteCategoryResponse,
  GetCategoriesListRequest,
  GetCategoriesListResponse,
  GetCategoryProductsResponse,
  GetCategoryRequest,
  GetCategoryResponse,
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
  GetCategoriesListResponse,
  GetCategoriesListRequest['query'],
  LocalUser
>;

export type GetCategoryProducts = ExpressHandlerWithParams<
  GetCategoryRequest['params'],
  undefined,
  GetCategoryProductsResponse,
  undefined,
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

export default interface ICategoryController {
  getCategory: GetCategory;
  listCategories: ListCategories;
  listCategoryProducts: GetCategoryProducts;
  createCategory: CreateCategory;
  updateCategory: UpdateCategory;
  deleteCategory: DeleteCategory;
}
