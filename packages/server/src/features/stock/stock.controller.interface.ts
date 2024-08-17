import type {
  CreateStockRequest,
  CreateStockResponse,
  DeleteStockRequest,
  DeleteStockResponse,
  GetStockRequest,
  GetStockResponse,
  ListStocksRequest,
  ListStocksResponse,
  UpdateStockRequest,
  UpdateStockResponse,
} from '@resala/shared';

import type { ExpressHandler, ExpressHandlerWithParams, LocalUser } from '../../types/index.js';

export type GetStock = ExpressHandlerWithParams<
  GetStockRequest['params'],
  undefined,
  GetStockResponse,
  undefined,
  LocalUser
>;

export type GetStocksList = ExpressHandler<
  undefined,
  ListStocksResponse,
  Required<ListStocksRequest['query']>
>;

export type CreateStock = ExpressHandler<CreateStockRequest['body'], CreateStockResponse>;

export type UpdateStock = ExpressHandlerWithParams<
  UpdateStockRequest['params'],
  UpdateStockRequest['body'],
  UpdateStockResponse
>;

export type DeleteStock = ExpressHandlerWithParams<
  DeleteStockRequest['params'],
  undefined,
  DeleteStockResponse
>;

export interface IStockController {
  getStock: GetStock;
  listStocks: GetStocksList;
  createStock: CreateStock;
  updateStock: UpdateStock;
  deleteStock: DeleteStock;
}
