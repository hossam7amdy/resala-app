import type {
  CreateStockRequest,
  CreateStockResponse,
  DeleteStockRequest,
  DeleteStockResponse,
  GetStockRequest,
  GetStockResponse,
  GetStocksListRequest,
  GetStocksListResponse,
  UpdateStockRequest,
  UpdateStockResponse,
} from '@resala/shared';

import type { ExpressHandler, ExpressHandlerWithParams, LocalUser } from '../../types/index.js';

export interface GetStock
  extends ExpressHandlerWithParams<
    GetStockRequest['params'],
    {},
    GetStockResponse,
    {},
    LocalUser
  > {}

export interface GetStocksList
  extends ExpressHandler<{}, GetStocksListResponse, GetStocksListRequest['query']> {}

export interface CreateStock
  extends ExpressHandler<CreateStockRequest['body'], CreateStockResponse> {}

export interface UpdateStock
  extends ExpressHandlerWithParams<
    UpdateStockRequest['params'],
    UpdateStockRequest['body'],
    UpdateStockResponse
  > {}

export interface DeleteStock
  extends ExpressHandlerWithParams<DeleteStockRequest['params'], {}, DeleteStockResponse> {}
