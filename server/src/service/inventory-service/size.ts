import prisma from '../../lib/prisma/index.js';
import { ConflictError, NotFoundError } from '../../utils/api-errors.js';

export async function findSizeById(sizeId: number) {
  const size = await prisma.size.findUnique({
    where: {
      id: sizeId,
    },
  });

  if (!size) {
    throw new NotFoundError('Size not found');
  }

  return size;
}

export async function listSizes() {
  return await prisma.size.findMany();
}

export async function createSize(name: string) {
  const size = await findSize(name);
  if (size) {
    throw new ConflictError('Size already exists');
  }

  return await prisma.size.create({
    data: {
      name,
    },
  });
}

export async function updateSize(id: number, name: string) {
  await findSizeById(id);

  const size = await findSize(name);
  if (size && size.id !== id) {
    throw new ConflictError('Size already exists');
  }

  return await prisma.size.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}

export async function deleteSize(id: number) {
  await findSizeById(id);

  const stock = await prisma.stock.findFirst({
    where: {
      sizeId: id,
    },
  });
  if (stock) {
    throw new ConflictError('Size is in use and cannot be deleted');
  }

  return await prisma.size.delete({
    where: {
      id,
    },
  });
}

async function findSize(name: string) {
  return await prisma.size.findUnique({
    where: {
      name,
    },
  });
}
