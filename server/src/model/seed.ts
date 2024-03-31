import { prisma } from '.';

async function main() {
  // create users
  await prisma.user.createMany({
    data: new Array(10).fill(0).map((_, i) => ({
      email: `test_${i}@test.com`,
      password: 'abcABC@123',
      phone: `01${`${Date.now()}`.slice(-9)}`,
      firstName: 'test',
      lastName: 'test',
      iterations: i + 1,
      role: i % 2 === 0 ? 'CUSTOMER' : 'ADMIN',
      salt: 'salt',
    })),
  });

  // create main categories
  await prisma.category.createMany({
    data: [
      {
        arName: 'نساء',
        enName: 'Women',
      },
      {
        arName: 'اطفال',
        enName: 'Kids',
      },
    ],
  });

  // create sub categories
  const mainCategory = await prisma.category.findMany({
    orderBy: { createdAt: 'asc' },
  });
  await prisma.category.createMany({
    data: [
      {
        categoryId: mainCategory[0].id,
        arName: 'فساتين',
        enName: 'Dresses',
      },
      {
        categoryId: mainCategory[0].id,
        arName: 'تنانير',
        enName: 'Skirts',
      },
      {
        categoryId: mainCategory[0].id,
        arName: 'بلوزات',
        enName: 'Blouses',
      },
    ],
  });
  await prisma.category.createMany({
    data: [
      {
        categoryId: mainCategory[1].id,
        arName: 'اولاد',
        enName: 'boys',
      },
      {
        categoryId: mainCategory[1].id,
        arName: 'بنات',
        enName: 'Girls',
      },
      {
        categoryId: mainCategory[1].id,
        arName: 'حديثى الولادة',
        enName: 'Newborn',
      },
    ],
  });

  // create nested sub categories
  const subCategories = await prisma.category.findMany({
    where: {
      categoryId: mainCategory[1].id,
    },
    orderBy: { createdAt: 'asc' },
  });
  await prisma.category.createMany({
    data: [
      {
        categoryId: subCategories[0].id,
        arName: 'بناطيل',
        enName: 'Pants',
      },
      {
        categoryId: subCategories[0].id,
        arName: 'قمصان',
        enName: 'Shirts',
      },
    ],
  });
  await prisma.category.createMany({
    data: [
      {
        categoryId: subCategories[2].id,
        arName: 'بجامات',
        enName: 'Pajamas',
      },
      {
        categoryId: subCategories[2].id,
        arName: 'بدل',
        enName: 'Suits',
      },
    ],
  });

  // create products
  const womenCategory = await prisma.category.findMany({
    where: {
      categoryId: mainCategory[0].id,
    },
    orderBy: { createdAt: 'asc' },
  });
  await prisma.product.createMany({
    data: [
      {
        categoryId: womenCategory[0].id,
        arName: 'فستان سهرة',
        enName: 'Evening Dress',
        arDescription: 'فستان سهرة طويل',
        enDescription: 'Long Evening Dress',
        price: 100,
      },
      {
        categoryId: womenCategory[0].id,
        arName: 'فستان زفاف',
        enName: 'Wedding Dress',
        arDescription: 'فستان زفاف طويل',
        enDescription: 'Long Wedding Dress',
        price: 200,
      },
      {
        categoryId: womenCategory[1].id,
        arName: 'تنورة قصيرة',
        enName: 'Short Skirt',
        arDescription: 'تنورة قصيرة',
        enDescription: 'Short Skirt',
        price: 50,
      },
      {
        categoryId: womenCategory[2].id,
        arName: 'بلوزة كتان',
        enName: 'Cotton Blouse',
        arDescription: 'بلوزة كتان',
        enDescription: 'Cotton Blouse',
        price: 40,
      },
    ],
  });

  // create colors and sizes
  await prisma.color.createMany({
    data: [
      {
        enName: 'white',
        arName: 'ابيض',
        code: '#ffffff',
      },
      {
        enName: 'black',
        arName: 'اسود',
        code: '#000000',
      },
      {
        enName: 'orange',
        arName: 'برتقالى',
        code: '#ffa500',
      },
      {
        enName: 'pink',
        arName: 'وردى',
        code: '#ffc0cb',
      },
      {
        enName: 'brown',
        arName: 'بنى',
        code: '#a52a2a',
      },
    ],
  });
  await prisma.size.createMany({
    data: [
      {
        name: 'S',
      },
      {
        name: 'M',
      },
      {
        name: 'L',
      },
      {
        name: 'XL',
      },
      {
        name: 'XXL',
      },
    ],
  });

  // create product variants (stocks)
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'asc' },
  });
  const colors = await prisma.color.findMany({
    orderBy: { createdAt: 'asc' },
  });
  const sizes = await prisma.size.findMany({
    orderBy: { createdAt: 'asc' },
  });
  await prisma.stock.createMany({
    data: [
      {
        productId: products[0].id,
        colorId: colors[0].id,
        sizeId: sizes[0].id,
        quantity: 10,
      },
      {
        productId: products[0].id,
        colorId: colors[1].id,
        sizeId: sizes[1].id,
        quantity: 5,
      },
      {
        productId: products[0].id,
        colorId: colors[2].id,
        sizeId: sizes[2].id,
        quantity: 7,
      },
      {
        productId: products[1].id,
        colorId: colors[0].id,
        sizeId: sizes[0].id,
        quantity: 3,
      },
      {
        productId: products[1].id,
        colorId: colors[1].id,
        sizeId: sizes[1].id,
        quantity: 2,
      },
      {
        productId: products[1].id,
        colorId: colors[2].id,
        sizeId: sizes[2].id,
        quantity: 4,
      },
      {
        productId: products[2].id,
        colorId: colors[0].id,
        sizeId: sizes[0].id,
        quantity: 6,
      },
      {
        productId: products[2].id,
        colorId: colors[1].id,
        sizeId: sizes[1].id,
        quantity: 8,
      },
      {
        productId: products[2].id,
        colorId: colors[2].id,
        sizeId: sizes[2].id,
        quantity: 9,
      },
      {
        productId: products[3].id,
        colorId: colors[0].id,
        sizeId: sizes[0].id,
        quantity: 2,
      },
      {
        productId: products[3].id,
        colorId: colors[1].id,
        sizeId: sizes[1].id,
        quantity: 3,
      },
      {
        productId: products[3].id,
        colorId: colors[2].id,
        sizeId: sizes[2].id,
        quantity: 4,
      },
    ],
  });

  await prisma.productImage.createMany({
    data: [
      {
        productId: products[0].id,
        imageUrl:
          'https://resala-hrb8f5d4fuesddfe.z02.azurefd.net/public/e84e0435-27b9-4b9b-82fc-105d18d81ff9.jpg',
      },
      {
        productId: products[1].id,
        imageUrl:
          'https://resala-hrb8f5d4fuesddfe.z02.azurefd.net/public/9070c644-a4ed-40f4-b18b-69d2e9be9b5d.jpg',
      },
      {
        productId: products[2].id,
        imageUrl:
          'https://resala-hrb8f5d4fuesddfe.z02.azurefd.net/public/25586091-2702-454d-909b-60d89be3290e.jpg',
      },
      {
        productId: products[3].id,
        imageUrl:
          'https://resala-hrb8f5d4fuesddfe.z02.azurefd.net/public/42182174-c6cc-4f2b-a6b9-c624af449b01.jpg',
      },
      {
        productId: products[0].id,
        imageUrl:
          'https://resala-hrb8f5d4fuesddfe.z02.azurefd.net/public/431a6f3a-795b-419f-9adf-d0f7bcf5d289.jpg',
      },
    ],
  });

  console.log('seeded successfully');
}

main()
  .catch(async e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
