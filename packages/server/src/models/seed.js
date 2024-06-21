import { PrismaClient } from '@prisma/client';
import process from 'process';

const prisma = new PrismaClient();

const generateRandomUsers = async () => {
  const users = [
    {
      salt: 'wsX1xE4HGE1FpE7PckEOKYgZf1Ty0xo+bOtqqpUYcw1BC3q5Kdq/7Q5/Kv2p7PUGrrvzSEe9wLEWBPKMwNakpP+q8HzA15lT31fGr46GwTU=',
      iterations: 12511,
      password:
        'HuZk7inYeVodB2+1TScguTSkrmTH1OmFMw+ZITICxmlz7QdWuLstasslFANduLHyh+zKD7iGa3qdy2Z97zfv8/M/T830B/mkrqj2If+2NNEOWcUifo6EFC1rOBYbt/6ehcPQS07LdD2YNpPoVEbgG3MgsF6Gukgc2jD7a7uecGpkuUY6WSZlCkBHHw+BvfA0A/JLOVbh',
      email: `customer@resala.com`,
      phone: `01500000000`,
      firstName: `customer`,
      lastName: `user`,
      role: 'CUSTOMER',
    },
    {
      salt: 'UIL2gAnLw13gMjwP5JonABkQDdaaCce7MfXekcacrlGs2z/7JhimgF/uyvT1y63gC695hhMBYbAynGQ35k4OUkFc00SwtMl/3zFgjx4JFyY=',
      iterations: 10888,
      password:
        'A6oHPQAQVV5RBwd3dUTcuxgetr80ILDi0wf4XeuBaHn1llO2bGTjw0DSEDbWOIN7q5D04B5nO3+ywc5DU2IH5B9+pICTxuhyjDDdarjoSnOWK191YfOYJSPLJ8TdOTMnj9XRkGOVPE/0jPqaNP4kn0LYgLoPx76zR9JDhGV94q+CSUEmXjjZDBRhK5lw5YB65L7dJ9Q8',
      email: `admin@resala.com`,
      phone: `01500000001`,
      firstName: 'admin',
      lastName: 'user',
      role: 'ADMIN',
    },
    {
      salt: 'wsX1xE4HGE1FpE7PckEOKYgZf1Ty0xo+bOtqqpUYcw1BC3q5Kdq/7Q5/Kv2p7PUGrrvzSEe9wLEWBPKMwNakpP+q8HzA15lT31fGr46GwTU=',
      iterations: 12511,
      password:
        'HuZk7inYeVodB2+1TScguTSkrmTH1OmFMw+ZITICxmlz7QdWuLstasslFANduLHyh+zKD7iGa3qdy2Z97zfv8/M/T830B/mkrqj2If+2NNEOWcUifo6EFC1rOBYbt/6ehcPQS07LdD2YNpPoVEbgG3MgsF6Gukgc2jD7a7uecGpkuUY6WSZlCkBHHw+BvfA0A/JLOVbh',
      email: `customer2@resala.com`,
      phone: `01500000002`,
      firstName: `customer`,
      lastName: `user`,
      role: 'CUSTOMER',
    },
  ];

  return users;
};

const main = async () => {
  // create users
  const users = await generateRandomUsers();
  await prisma.user.createMany({
    data: users,
  });

  // create main categories
  await prisma.category.createMany({
    data: [
      {
        arName: 'ملابس خروج',
        enName: 'Outfits',
      },
      {
        arName: 'ملابس مناسبات',
        enName: 'Occasions',
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
        imageKey: 'evening-dress.jpg',
        imageUrl: 'http://localhost:5000/uploads/evening-dress.jpg',
      },
      {
        categoryId: categories[0].id,
        arName: 'فستان زفاف',
        enName: 'Wedding Dress',
        arDescription: 'فستان زفاف طويل',
        enDescription: 'Long Wedding Dress',
        price: 200,
        imageKey: 'wedding-dress.jpg',
        imageUrl: 'http://localhost:5000/uploads/wedding-dress.jpg',
      },
      {
        categoryId: categories[1].id,
        arName: 'بلوزة قطن',
        enName: 'Cotton Blouse',
        arDescription: 'بلوزة كتان',
        enDescription: 'Cotton Blouse',
        price: 400,
        imageKey: 'cotton-blouse.jpg',
        imageUrl: 'http://localhost:5000/uploads/cotton-blouse.jpg',
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

  // create product variants (stocks) 2 for each product
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
        quantity: 20,
      },
      {
        productId: products[1].id,
        colorId: colors[2].id,
        sizeId: sizes[2].id,
        quantity: 30,
      },
      {
        productId: products[1].id,
        colorId: colors[3].id,
        sizeId: sizes[3].id,
        quantity: 40,
      },
      {
        productId: products[2].id,
        colorId: colors[4].id,
        sizeId: sizes[4].id,
        quantity: 50,
      },
      {
        productId: products[2].id,
        colorId: colors[0].id,
        sizeId: sizes[0].id,
        quantity: 60,
      },
    ],
  });

  console.log('seeded successfully 🌱');
};

main()
  .catch(async e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
