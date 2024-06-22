import type {
  CreateSizeRequest,
  CreateSizeResponse,
  DeleteSizeRequest,
  DeleteSizeResponse,
  GetSizeRequest,
  GetSizeResponse,
  GetSizesListRequest,
  GetSizesListResponse,
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

export type GetSizesList = ExpressHandler<
  undefined,
  GetSizesListResponse,
  GetSizesListRequest['query']
>;

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

export default interface ISizeController {
  getSize: GetSize;
  listSizes: GetSizesList;
  createSize: CreateSize;
  updateSize: UpdateSize;
  deleteSize: DeleteSize;
}
