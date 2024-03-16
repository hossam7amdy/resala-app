import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { RequestHandler } from 'express';

import { prisma } from '../../model';
import { BadRequestError } from '../../utils/api-errors';

export const getColor: RequestHandler = async (req, res, next) => {
  const id = parseInt(req.params.colorId + '');
  if (isNaN(id)) {
    return next(new BadRequestError('Invalid color id'));
  }

  const color = await prisma.color.findUnique({
    include: {
      stocks: true,
    },
    where: { id },
  });

  if (!color) {
    return next(new BadRequestError('Color not found'));
  }

  return res.json({
    success: true,
    data: color,
  });
};

export const getColorsList: RequestHandler = async (_req, res, _next) => {
  const colors = await prisma.color.findMany();
  return res.json({
    success: true,
    data: colors,
  });
};

export const createColor: RequestHandler = async (req, res, next) => {
  const { arName, enName, code } = req.body;

  if (await isColorExist({ arName, enName, code })) {
    return next(new BadRequestError('Color already exists'));
  }

  const color = await prisma.color.create({
    data: {
      arName,
      enName,
      code,
    },
  });

  return res.status(201).json({
    success: true,
    data: color,
  });
};

export const updateColor: RequestHandler = async (req, res, next) => {
  const id = parseInt(req.params.colorId);
  const { arName, enName, code } = req.body;

  const exist = await prisma.color.findUnique({ where: { id } });
  if (!exist) {
    return next(new BadRequestError('Color not found'));
  }

  let color;
  try {
    color = await prisma.color.update({
      where: { id },
      data: {
        arName,
        enName,
        code,
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return next(new BadRequestError('Color already exists'));
    }

    next(error);
  }

  return res.json({
    success: true,
    data: color,
  });
};

const isColorExist = async (color: { arName: string; enName: string; code: string }) => {
  const exist = await prisma.color.findFirst({
    where: {
      OR: [{ arName: color.arName }, { enName: color.enName }, { code: color.code }],
    },
  });
  return !!exist;
};
