import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const generateRandomUsers = async () => {
  const users = [
    {
      salt: 'UIL2gAnLw13gMjwP5JonABkQDdaaCce7MfXekcacrlGs2z/7JhimgF/uyvT1y63gC695hhMBYbAynGQ35k4OUkFc00SwtMl/3zFgjx4JFyY=',
      iterations: 10888,
      password:
        'A6oHPQAQVV5RBwd3dUTcuxgetr80ILDi0wf4XeuBaHn1llO2bGTjw0DSEDbWOIN7q5D04B5nO3+ywc5DU2IH5B9+pICTxuhyjDDdarjoSnOWK191YfOYJSPLJ8TdOTMnj9XRkGOVPE/0jPqaNP4kn0LYgLoPx76zR9JDhGV94q+CSUEmXjjZDBRhK5lw5YB65L7dJ9Q8',
      email: `admin@resala.com`,
      phone: `01500000000`,
      firstName: 'admin',
      lastName: 'user',
      role: 'ADMIN',
    },
    {
      salt: 'wsX1xE4HGE1FpE7PckEOKYgZf1Ty0xo+bOtqqpUYcw1BC3q5Kdq/7Q5/Kv2p7PUGrrvzSEe9wLEWBPKMwNakpP+q8HzA15lT31fGr46GwTU=',
      iterations: 12511,
      password:
        'HuZk7inYeVodB2+1TScguTSkrmTH1OmFMw+ZITICxmlz7QdWuLstasslFANduLHyh+zKD7iGa3qdy2Z97zfv8/M/T830B/mkrqj2If+2NNEOWcUifo6EFC1rOBYbt/6ehcPQS07LdD2YNpPoVEbgG3MgsF6Gukgc2jD7a7uecGpkuUY6WSZlCkBHHw+BvfA0A/JLOVbh',
      email: `customer@resala.com`,
      phone: `01500000001`,
      firstName: `customer`,
      lastName: `user`,
      role: 'CUSTOMER',
    },
  ];

  return users;
};

async function main() {
  // create users
  const users = await generateRandomUsers();
  await prisma.user.createMany({
    data: users,
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
      ...new Array(50).fill(0).map((_, index) => ({
        arName: `فئة رئيسية ${index + 1}`,
        enName: `Main Category ${index + 1}`,
      })),
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
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'asc' },
  });
  await prisma.product.createMany({
    data: [
      {
        categoryId: categories[0].id,
        arName: 'فستان سهرة',
        enName: 'Evening Dress',
        arDescription: 'فستان سهرة طويل',
        enDescription: 'Long Evening Dress',
        price: 100,
      },
      {
        categoryId: categories[0].id,
        arName: 'فستان زفاف',
        enName: 'Wedding Dress',
        arDescription: 'فستان زفاف طويل',
        enDescription: 'Long Wedding Dress',
        price: 200,
      },
      {
        categoryId: categories[2].id,
        arName: 'بلوزة كتان',
        enName: 'Cotton Blouse',
        arDescription: 'بلوزة كتان',
        enDescription: 'Cotton Blouse',
        price: 400,
      },
      ...new Array(50).fill(0).map((_, index) => ({
        categoryId: categories[Math.floor(Math.random() * categories.length)].id,
        arName: `منتج ${index + 1}`,
        enName: `Product ${index + 1}`,
        arDescription: `وصف المنتج ${index + 1} `.repeat(15),
        enDescription: `Product ${index + 1} Description `.repeat(15),
        price: Math.floor(Math.random() * 1000),
      })),
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

  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < colors.length; j++) {
      for (let k = 0; k < sizes.length; k++) {
        await prisma.stock.create({
          data: {
            productId: products[i].id,
            colorId: colors[j].id,
            sizeId: sizes[k].id,
            quantity: Math.floor(Math.random() * 20),
          },
        });
      }
    }
  }

  console.log('seeded successfully 🌱');
}

main()
  .catch(async e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
