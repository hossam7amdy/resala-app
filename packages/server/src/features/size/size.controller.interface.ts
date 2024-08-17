import type {
  CreateSizeRequest,
  CreateSizeResponse,
  DeleteSizeRequest,
  DeleteSizeResponse,
  GetSizeRequest,
  GetSizeResponse,
  ListSizesRequest,
  ListSizesResponse,
  UpdateSizeRequest,
  UpdateSizeResponse,
} from '@resala/shared';

import type { ExpressHandler, ExpressHandlerWithParams, LocalUser } from '../../types/index.js';

export type GetSize = ExpressHandlerWithParams<
  GetSizeRequest['params'],
  undefined,
  GetSizeResponse,
  undefined,
  LocalUser
>;

export type GetSizesList = ExpressHandler<undefined, ListSizesResponse, ListSizesRequest['query']>;

export type CreateSize = ExpressHandler<CreateSizeRequest['body'], CreateSizeResponse>;

export type UpdateSize = ExpressHandlerWithParams<
  UpdateSizeRequest['params'],
  UpdateSizeRequest['body'],
  UpdateSizeResponse
>;

export type DeleteSize = ExpressHandlerWithParams<
  DeleteSizeRequest['params'],
  undefined,
  DeleteSizeResponse
>;

export interface ISizeController {
  getSize: GetSize;
  listSizes: GetSizesList;
  createSize: CreateSize;
  updateSize: UpdateSize;
  deleteSize: DeleteSize;
}
