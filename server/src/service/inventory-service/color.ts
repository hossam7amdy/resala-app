import { Prisma } from '@prisma/client';

import prisma from '../../lib/prisma';
import { ConflictError, NotFoundError } from '../../utils/api-errors';

export async function findColorById(sizeId: number) {
  const color = await prisma.color.findUnique({
    where: {
      id: sizeId,
    },
  });

  if (!color) {
    throw new NotFoundError('Color not found');
  }

  return color;
}

export async function getColors() {
  return await prisma.color.findMany();
}

export async function createColor(color: Prisma.ColorCreateInput) {
  const exist = await findColor(color);
  if (exist) {
    throw new ConflictError('Color already exists');
  }

  return await prisma.color.create({
    data: color,
  });
}

export async function updateColor(colorId: number, color: Prisma.ColorCreateInput) {
  const exist = await findColor(color);
  if (exist && exist.id !== colorId) {
    throw new ConflictError('Color already exists');
  }

  return await prisma.color.upsert({
    create: color,
    update: color,
    where: {
      id: colorId,
    },
  });
}

export async function deleteColor(colorId: number) {
  await findColorById(colorId);

  const stock = await prisma.stock.findFirst({
    where: {
      colorId,
    },
  });
  if (stock) {
    throw new ConflictError('Color is in use and cannot be deleted');
  }

  return await prisma.color.delete({
    where: {
      id: colorId,
    },
  });
}

async function findColor(color: Pick<Prisma.ColorCreateInput, 'arName' | 'enName' | 'code'>) {
  return await prisma.color.findFirst({
    where: {
      OR: [{ arName: color.arName }, { enName: color.enName }, { code: color.code }],
    },
  });
}
