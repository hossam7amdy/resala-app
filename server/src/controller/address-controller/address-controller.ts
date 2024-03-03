import { RequestHandler } from 'express';

import { BadRequestError, NotFoundError } from '../../lib/error';
import { prisma } from '../../model';
import { validateCreateAddress, validateUpdateAddress } from './address-validator';

export const createAddress: RequestHandler = async (req, res) => {
  const userId = res.locals.user.id as string;
  const error = validateCreateAddress({ ...req.body, userId });
  if (error) {
    throw new BadRequestError(error);
  }

  const address = await prisma.address.create({
    data: req.body,
  });
  const userAddress = await prisma.userAddress.create({
    data: {
      userId,
      addressId: address.id,
    },
  });

  return res.status(201).json({
    success: true,
    message: 'Address created successfully',
    data: userAddress,
  });
};

export const updateAddress: RequestHandler = async (req, res, next) => {
  const userId = res.locals.user.id as string;
  const addressId = parseInt(req.params.addressId + '');

  if (isNaN(addressId)) {
    return next(new BadRequestError('Invalid address ID'));
  }

  const error = validateUpdateAddress({ ...req.body, id: addressId, userId });
  if (error) {
    throw new BadRequestError(error);
  }

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

export const deleteAddress: RequestHandler = async (req, res, next) => {
  const userId = res.locals.user.id as string;
  const addressId = parseInt(req.params.addressId + '');

  if (isNaN(addressId)) {
    return next(new BadRequestError('Invalid address ID'));
  }

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
