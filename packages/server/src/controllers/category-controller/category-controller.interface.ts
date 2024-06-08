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

export interface GetCategory
  extends ExpressHandlerWithParams<
    GetCategoryRequest['params'],
    undefined,
    GetCategoryResponse,
    undefined,
    LocalUser
  > {}

export interface ListCategories
  extends ExpressHandler<
    undefined,
    GetCategoriesListResponse,
    GetCategoriesListRequest['query'],
    LocalUser
  > {}

export interface GetCategoryProducts
  extends ExpressHandlerWithParams<
    GetCategoryRequest['params'],
    undefined,
    GetCategoryProductsResponse,
    undefined,
    LocalUser
  > {}

export interface CreateCategory
  extends ExpressHandler<
    CreateCategoryRequest['body'],
    CreateCategoryResponse,
    undefined,
    LocalUser
  > {}

export interface UpdateCategory
  extends ExpressHandlerWithParams<
    UpdateCategoryRequest['params'],
    UpdateCategoryRequest['body'],
    UpdateCategoryResponse,
    undefined,
    LocalUser
  > {}

export interface DeleteCategory
  extends ExpressHandlerWithParams<
    DeleteCategoryRequest['params'],
    undefined,
    DeleteCategoryResponse,
    undefined,
    LocalUser
  > {}
