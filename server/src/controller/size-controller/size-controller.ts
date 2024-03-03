import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { RequestHandler } from 'express';

import { BadRequestError } from '../../lib/error';
import { prisma } from '../../model';

export const getSize: RequestHandler = async (req, res, next) => {
  const id = parseInt(req.params.sizeId);

  const size = await prisma.size.findUnique({
    include: {
      stocks: true,
    },
    where: { id },
  });

  if (!size) {
    return next(new BadRequestError('Size not found'));
  }

  return res.json({
    success: true,
    data: size,
  });
};

export const getSizesList: RequestHandler = async (_req, res, _next) => {
  const sizes = await prisma.size.findMany();
  return res.json({
    success: true,
    data: sizes,
  });
};

export const createSize: RequestHandler = async (req, res, next) => {
  const { name } = req.body;

  let size;
  try {
    size = await prisma.size.create({
      data: {
        name,
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return next(new BadRequestError('Size already exists'));
    }
    next(error);
  }

  return res.status(201).json({
    success: true,
    data: size,
  });
};

export const updateSize: RequestHandler = async (req, res, next) => {
  const id = parseInt(req.params.sizeId);

  let size;
  try {
    size = await prisma.size.update({
      where: { id },
      data: {
        name: req.body.name,
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return next(new BadRequestError('Size already exists'));
    }
    next(error);
  }

  return res.json({
    success: true,
    data: size,
  });
};
