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

export type GetColor = ExpressHandlerWithParams<
  GetColorRequest['params'],
  undefined,
  GetColorResponse,
  undefined,
  LocalUser
>;

export type GetColorsList = ExpressHandler<
  undefined,
  GetColorsListResponse,
  GetColorsListRequest['query']
>;

export type CreateColor = ExpressHandler<CreateColorRequest['body'], CreateColorResponse>;

export type UpdateColor = ExpressHandlerWithParams<
  UpdateColorRequest['params'],
  UpdateColorRequest['body'],
  UpdateColorResponse
>;

export type DeleteColor = ExpressHandlerWithParams<
  DeleteColorRequest['params'],
  undefined,
  DeleteColorResponse
>;

export default interface IColorController {
  getColor: GetColor;
  listColors: GetColorsList;
  createColor: CreateColor;
  updateColor: UpdateColor;
  deleteColor: DeleteColor;
}
