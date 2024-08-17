import type {
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductRequest,
  DeleteProductResponse,
  GetProductRequest,
  GetProductResponse,
  ListProductsRequest,
  ListProductsResponse,
  UpdateProductRequest,
  UpdateProductResponse,
} from '@resala/shared';

import type { ExpressHandler, ExpressHandlerWithParams, LocalUser } from '../../types/index.js';

export type GetProduct = ExpressHandlerWithParams<
  GetProductRequest['params'],
  undefined,
  GetProductResponse,
  undefined,
  LocalUser
>;

export type ListProducts = ExpressHandler<
  undefined,
  ListProductsResponse,
  ListProductsRequest['query']
>;

export type CreateProduct = ExpressHandler<CreateProductRequest['body'], CreateProductResponse>;

export type UpdateProduct = ExpressHandlerWithParams<
  UpdateProductRequest['params'],
  UpdateProductRequest['body'],
  UpdateProductResponse
>;

export type DeleteProduct = ExpressHandlerWithParams<
  DeleteProductRequest['params'],
  undefined,
  DeleteProductResponse
>;

export interface IProductController {
  getProduct: GetProduct;
  listProducts: ListProducts;
  createProduct: CreateProduct;
  updateProduct: UpdateProduct;
  deleteProduct: DeleteProduct;
}
