import type {
  CreateColorRequest,
  CreateColorResponse,
  DeleteColorRequest,
  DeleteColorResponse,
  GetColorRequest,
  GetColorResponse,
  ListColorsRequest,
  ListColorsResponse,
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
  ListColorsResponse,
  ListColorsRequest['query']
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

export interface IColorController {
  getColor: GetColor;
  listColors: GetColorsList;
  createColor: CreateColor;
  updateColor: UpdateColor;
  deleteColor: DeleteColor;
}
