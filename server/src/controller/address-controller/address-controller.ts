import {
  DeleteAddressRequest,
  DeleteAddressResponse,
  UpdateAddressRequest,
  UpdateAddressResponse,
} from '@resala/shared';
import { RequestHandler } from 'express';

import { NotFoundError } from '../../lib/error';
import { prisma } from '../../model';
import { ExpressHandlerWithParams } from '../../types';

export const createAddress: RequestHandler = async (req, res) => {
  const userId = res.locals.user.id as string;

  const address = await prisma.address.create({
    data: req.body,
  });
  await prisma.userAddress.create({
    data: {
      userId,
      addressId: address.id,
    },
  });

  return res.status(201).json({
    success: true,
    message: 'Address created successfully',
    data: address,
  });
};

export const updateAddress: ExpressHandlerWithParams<
  { addressId: string },
  UpdateAddressRequest,
  UpdateAddressResponse
> = async (req, res, next) => {
  const userId = res.locals.user.id as string;
  const addressId = parseInt(req.params.addressId + '');

  const exist = await prisma.userAddress.findUnique({
    where: {
      userId: userId,
      addressId: addressId,
    },
  });
  if (!exist) {
    return next(new NotFoundError('Address not found'));
  }

  const address = await prisma.address.update({
    data: req.body,
    where: {
      id: addressId,
    },
  });

  return res.json({
    success: true,
    message: 'Address updated successfully',
    data: address,
  });
};

export const deleteAddress: ExpressHandlerWithParams<
  { addressId: string },
  DeleteAddressRequest,
  DeleteAddressResponse
> = async (req, res, next) => {
  const userId = res.locals.user.id as string;
  const addressId = parseInt(req.params.addressId + '');

  const exist = await prisma.userAddress.findUnique({
    where: {
      userId: userId,
      addressId: addressId,
    },
  });
  if (!exist) {
    return next(new NotFoundError('Address not found'));
  }

  await prisma.address.delete({
    where: {
      id: addressId,
    },
  });

  return res.json({
    success: true,
    message: 'Address deleted successfully',
    data: { id: addressId },
  });
};

export const getAddressList: RequestHandler = async (_, res) => {
  const userId = res.locals.user.id as string;
  const addresses = await prisma.userAddress.findMany({
    include: {
      address: true,
    },
    where: {
      userId,
    },
  });

  return res.json({
    success: true,
    data: addresses,
  });
};
