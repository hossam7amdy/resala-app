import {
  CreateAddressRequest,
  CreateAddressResponse,
  DeleteAddressRequest,
  DeleteAddressResponse,
  GetUserAddressListRequest,
  GetUserAddressListResponse,
  UpdateAddressRequest,
  UpdateAddressResponse,
} from '@resala/shared';
import { RequestHandler } from 'express';

import { LocalUser } from '../../types';

export type CreateAddress = RequestHandler<
  null,
  CreateAddressResponse,
  CreateAddressRequest,
  null,
  LocalUser
>;

export type UpdateAddress = RequestHandler<
  { addressId: string },
  UpdateAddressResponse,
  UpdateAddressRequest,
  null,
  LocalUser
>;

export type DeleteAddress = RequestHandler<
  { addressId: string },
  DeleteAddressResponse,
  DeleteAddressRequest,
  null,
  LocalUser
>;

export type GetAddressList = RequestHandler<
  null,
  GetUserAddressListResponse,
  GetUserAddressListRequest,
  null,
  LocalUser
>;
