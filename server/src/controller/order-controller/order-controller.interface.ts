import {
  CreateOrderRequest,
  CreateOrderResponse,
  DeleteOrderRequest,
  DeleteOrderResponse,
  GetOrderRequest,
  GetOrderResponse,
  GetOrdersListRequest,
  GetOrdersListResponse,
} from '@resala/shared';

import { ExpressHandler, ExpressHandlerWithParams, LocalUser } from '../../types';

export interface CreateOrder
  extends ExpressHandler<CreateOrderRequest['body'], CreateOrderResponse, {}, LocalUser> {}

export interface GetOrder
  extends ExpressHandlerWithParams<
    GetOrderRequest['params'],
    {},
    GetOrderResponse,
    {},
    LocalUser
  > {}

export interface GetOrdersList
  extends ExpressHandler<{}, GetOrdersListResponse, GetOrdersListRequest['query'], LocalUser> {}

export interface DeleteOrder
  extends ExpressHandlerWithParams<
    DeleteOrderRequest['params'],
    {},
    DeleteOrderResponse,
    {},
    LocalUser
  > {}
