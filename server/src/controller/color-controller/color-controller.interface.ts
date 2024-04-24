import type {
  CreateColorRequest,
  CreateColorResponse,
  DeleteColorRequest,
  DeleteColorResponse,
  GetColorRequest,
  GetColorResponse,
  GetColorsListRequest,
  GetColorsListResponse,
  UpdateColorRequest,
  UpdateColorResponse,
} from '@resala/shared';

import type { ExpressHandler, ExpressHandlerWithParams, LocalUser } from '../../types/index.js';

export interface GetColor
  extends ExpressHandlerWithParams<
    GetColorRequest['params'],
    {},
    GetColorResponse,
    {},
    LocalUser
  > {}

export interface GetColorsList
  extends ExpressHandler<{}, GetColorsListResponse, GetColorsListRequest['query']> {}

export interface CreateColor
  extends ExpressHandler<CreateColorRequest['body'], CreateColorResponse> {}

export interface UpdateColor
  extends ExpressHandlerWithParams<
    UpdateColorRequest['params'],
    UpdateColorRequest['body'],
    UpdateColorResponse
  > {}

export interface DeleteColor
  extends ExpressHandlerWithParams<DeleteColorRequest['params'], {}, DeleteColorResponse> {}
