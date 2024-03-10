import { NotFoundError } from '../../lib/error';
import { prisma } from '../../model';
import { CreateAddress, DeleteAddress, GetAddressList, UpdateAddress } from './address-types';

export const createAddress: CreateAddress = async (req, res) => {
  const userId = res.locals.user.id;

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
    data: address,
  });
};

export const updateAddress: UpdateAddress = async (req, res, next) => {
  const userId = res.locals.user.id;
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
    data: address,
  });
};

export const deleteAddress: DeleteAddress = async (req, res, next) => {
  const userId = res.locals.user.id;
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
    data: {
      id: addressId,
    },
  });
};

export const getAddressList: GetAddressList = async (_, res) => {
  const userId = res.locals.user.id;
  const addressList = await prisma.userAddress.findMany({
    select: {
      address: true,
    },
    where: {
      userId,
    },
  });

  return res.json({
    success: true,
    data: addressList.map(add => add.address),
  });
};
