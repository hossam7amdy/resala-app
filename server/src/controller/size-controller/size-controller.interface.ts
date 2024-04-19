import {
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

import { ExpressHandler, ExpressHandlerWithParams, LocalUser } from '../../types/index.js';

export interface GetSize
  extends ExpressHandlerWithParams<GetSizeRequest['params'], {}, GetSizeResponse, {}, LocalUser> {}

export interface GetSizesList
  extends ExpressHandler<{}, GetSizesListResponse, GetSizesListRequest['query']> {}

export interface CreateSize extends ExpressHandler<CreateSizeRequest['body'], CreateSizeResponse> {}

export interface UpdateSize
  extends ExpressHandlerWithParams<
    UpdateSizeRequest['params'],
    UpdateSizeRequest['body'],
    UpdateSizeResponse
  > {}

export interface DeleteSize
  extends ExpressHandlerWithParams<DeleteSizeRequest['params'], {}, DeleteSizeResponse> {}
