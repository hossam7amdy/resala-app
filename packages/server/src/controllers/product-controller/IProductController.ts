import type {
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductRequest,
  DeleteProductResponse,
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

export type GetProduct = ExpressHandlerWithParams<
  GetProductRequest['params'],
  undefined,
  GetProductResponse,
  undefined,
  LocalUser
>;

export type GetProductsList = ExpressHandler<
  undefined,
  GetProductsListResponse,
  Required<GetProductsListRequest['query']>
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

export type ListProductStocks = ExpressHandlerWithParams<
  GetProductStocksRequest['params'],
  undefined,
  GetProductStocksResponse,
  undefined
>;

export default interface IProductController {
  getProduct: GetProduct;
  listProducts: GetProductsList;
  createProduct: CreateProduct;
  updateProduct: UpdateProduct;
  deleteProduct: DeleteProduct;
  listProductStocks: ListProductStocks;
}
