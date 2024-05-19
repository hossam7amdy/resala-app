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
    {},
    GetCategoryResponse,
    GetCategoryRequest['query'],
    LocalUser
  > {}

export interface ListCategories
  extends ExpressHandler<
    {},
    GetCategoriesListResponse,
    GetCategoriesListRequest['query'],
    LocalUser
  > {}

export interface GetCategoryProducts
  extends ExpressHandlerWithParams<
    GetCategoryRequest['params'],
    {},
    GetCategoryProductsResponse,
    {},
    LocalUser
  > {}

export interface CreateCategory
  extends ExpressHandler<CreateCategoryRequest['body'], CreateCategoryResponse, {}, LocalUser> {}

export interface UpdateCategory
  extends ExpressHandlerWithParams<
    UpdateCategoryRequest['params'],
    UpdateCategoryRequest['body'],
    UpdateCategoryResponse,
    {},
    LocalUser
  > {}

export interface DeleteCategory
  extends ExpressHandlerWithParams<
    DeleteCategoryRequest['params'],
    {},
    DeleteCategoryResponse,
    {},
    LocalUser
  > {}
