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
    undefined,
    GetProductResponse,
    undefined,
    LocalUser
  > {}

export interface GetProductsList
  extends ExpressHandler<
    undefined,
    GetProductsListResponse,
    Required<GetProductsListRequest['query']>
  > {}

export interface CreateProduct
  extends ExpressHandler<CreateProductRequest['body'], CreateProductResponse> {}

export interface UpdateProduct
  extends ExpressHandlerWithParams<
    UpdateProductRequest['params'],
    UpdateProductRequest['body'],
    UpdateProductResponse
  > {}

export interface DeleteProduct
  extends ExpressHandlerWithParams<
    DeleteProductRequest['params'],
    undefined,
    DeleteProductResponse
  > {}

export interface ListProductImages
  extends ExpressHandlerWithParams<
    GetProductImagesRequest['params'],
    undefined,
    GetProductImagesResponse
  > {}

export interface CreateProductImage
  extends ExpressHandler<CreateProductImageRequest['body'], CreateProductImageResponse> {}

export interface DeleteProductImage
  extends ExpressHandlerWithParams<
    DeleteProductImageRequest['params'],
    undefined,
    DeleteProductImageResponse
  > {}

export interface ListProductStocks
  extends ExpressHandlerWithParams<
    GetProductStocksRequest['params'],
    undefined,
    GetProductStocksResponse,
    undefined
  > {}
