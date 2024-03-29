import { prisma } from '../model';
import { NotFoundError } from '../utils/api-errors';

export async function getUserCart(userId: number) {
  const cart = await prisma.cart.findMany({
    select: {
      stockId: true,
      quantity: true,
      stock: {
        select: {
          product: true,
          color: true,
          size: true,
        },
      },
    },
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return cart.map(item => ({
    ...item,
    product: {
      id: item.stock.product.id,
      arName: item.stock.product.arName,
      enName: item.stock.product.enName,
      price: item.stock.product.price,
    },
    color: {
      id: item.stock.color.id,
      arName: item.stock.color.arName,
      enName: item.stock.color.enName,
      code: item.stock.color.code,
    },
    size: {
      id: item.stock.size.id,
      name: item.stock.size.name,
    },
  }));
}

export async function addToCart(
  userId: number,
  cartItem: {
    stockId: number;
    quantity: number;
  }
) {
  const stock = await findStockById(cartItem.stockId);

  if (stock.quantity < cartItem.quantity) {
    throw new NotFoundError('Not enough stock');
  }

  await prisma.cart.upsert({
    create: { userId, ...cartItem },
    update: { userId, ...cartItem },
    where: { userId_stockId: { userId, stockId: cartItem.stockId } },
  });

  return getUserCart(userId);
}

export async function removeFromCart(userId: number, stockId: number) {
  try {
    await prisma.cart.delete({
      where: { userId_stockId: { userId, stockId } },
    });

    return getUserCart(userId);
  } catch (error) {
    throw new NotFoundError('Item not found in cart');
  }
}

export async function removeUserCart(userId: number) {
  await prisma.cart.deleteMany({ where: { userId } });
}

export async function getUserWishlist(userId: number) {
  const wishlist = await prisma.wishlist.findMany({
    select: {
      product: true,
    },
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return wishlist.map(item => item.product);
}

export async function addProductToWishlist(userId: number, productId: number) {
  await findProductById(productId);

  await prisma.wishlist.upsert({
    create: { userId, productId },
    update: { userId, productId },
    where: { userId_productId: { userId, productId } },
  });

  return getUserWishlist(userId);
}

export async function removeProductFromWishlist(userId: number, productId: number) {
  try {
    await prisma.wishlist.delete({
      where: { userId_productId: { userId, productId } },
    });

    return getUserWishlist(userId);
  } catch (error) {
    throw new NotFoundError('Product not found in wishlist');
  }
}

export async function removeUserWishlist(userId: number) {
  await prisma.wishlist.deleteMany({ where: { userId } });
}

async function findStockById(id: number) {
  const stock = await prisma.stock.findUnique({
    where: { id },
  });

  if (!stock) {
    throw new NotFoundError('Stock not found');
  }

  return stock;
}

async function findProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new NotFoundError('Product not found');
  }

  return product;
}
