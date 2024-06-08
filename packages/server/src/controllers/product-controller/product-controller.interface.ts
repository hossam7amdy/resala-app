import type {
  CreateProductImageRequest,
  CreateProductImageResponse,
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductImageRequest,
  DeleteProductImageResponse,
  DeleteProductRequest,
  DeleteProductResponse,
  GetProductImagesRequest,
  GetProductImagesResponse,
  GetProductRequest,
  GetProductResponse,
  GetProductStocksRequest,
  GetProductStocksResponse,
  GetProductsListRequest,
  GetProductsListResponse,
  UpdateProductRequest,
  UpdateProductResponse,
} from '@resala/shared';

import type { ExpressHandler, ExpressHandlerWithParams, LocalUser } from '../../types/index.js';

export interface GetProduct
  extends ExpressHandlerWithParams<
    GetProductRequest['params'],
    {},
    GetProductResponse,
    Required<GetProductRequest['query']>,
    LocalUser
  > {}

export interface GetProductsList
  extends ExpressHandler<{}, GetProductsListResponse, Required<GetProductsListRequest['query']>> {}

export interface CreateProduct
  extends ExpressHandler<CreateProductRequest['body'], CreateProductResponse> {}

export interface UpdateProduct
  extends ExpressHandlerWithParams<
    UpdateProductRequest['params'],
    UpdateProductRequest['body'],
    UpdateProductResponse
  > {}

export interface DeleteProduct
  extends ExpressHandlerWithParams<DeleteProductRequest['params'], {}, DeleteProductResponse> {}

export interface ListProductImages
  extends ExpressHandlerWithParams<
    GetProductImagesRequest['params'],
    {},
    GetProductImagesResponse
  > {}

export interface CreateProductImage
  extends ExpressHandler<CreateProductImageRequest['body'], CreateProductImageResponse> {}

export interface DeleteProductImage
  extends ExpressHandlerWithParams<
    DeleteProductImageRequest['params'],
    {},
    DeleteProductImageResponse
  > {}

export interface ListProductStocks
  extends ExpressHandlerWithParams<
    GetProductStocksRequest['params'],
    {},
    GetProductStocksResponse,
    {}
  > {}
