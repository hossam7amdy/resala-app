import { PrismaClient } from '@prisma/client';
import process from 'process';

const db = new PrismaClient();

const main = async () => {
  console.log('seeding database...');

  // create users
  await db.user.createMany({
    data: [
      {
        email: `customer@resala.com`,
        phone: `01500000000`,
        firstName: `Resala`,
        lastName: `Customer`,
        role: 'CUSTOMER',
      },
      {
        email: `admin@resala.com`,
        phone: `01500000001`,
        firstName: 'Resala',
        lastName: 'Admin',
        role: 'ADMIN',
        isEmailVerified: true,
      },
      {
        email: `staff@resala.com`,
        phone: `01500000002`,
        firstName: `Resala`,
        lastName: `Moderator`,
        role: 'STAFF',
        isEmailVerified: true,
      },
    ],
  });

  // create main categories
  await db.category.createMany({
    data: [
      { arName: 'نقاب', enName: 'Niqab' },
      { arName: 'إسدالات', enName: 'Prayer Set' },
      { arName: 'خمار', enName: 'Khemar' },
    ],
  });

  const categories = await db.category.findMany();

  // create products
  await db.product.createMany({
    data: [
      {
        arName: 'نقاب قطعة واحدة',
        enName: 'One Piece Niqab',
        categoryId: categories[0].id,
        price: 50,
        imageKey: '/dummy/product-1.webp',
        imageUrl: 'https://resala-app.s3.eu-north-1.amazonaws.com/dummy/product-1.webp',
        arDescription: 'نقاب قطعة واحدة مصنوع من قماش القطن',
        enDescription:
          'One piece niqab made of cotton fabric with a soft texture and comfortable to wear for long hours of the day',
      },
      {
        arName: 'اسدال صلاة',
        enName: 'Prayer Set',
        categoryId: categories[1].id,
        price: 100,
        imageKey: '/dummy/product-2.webp',
        imageUrl: 'https://resala-app.s3.eu-north-1.amazonaws.com/dummy/product-2.webp',
        arDescription: 'اسدال صلاة مصنوع من قماش القطن',
        enDescription:
          'Prayer set made of cotton fabric with a soft texture and comfortable to wear for long hours of the day',
      },
      {
        arName: 'خمار قطعتين',
        enName: 'Two Piece Khemar',
        categoryId: categories[2].id,
        price: 70,
        imageKey: '/dummy/product-1.webp',
        imageUrl: 'https://resala-app.s3.eu-north-1.amazonaws.com/dummy/product-1.webp',
        arDescription: 'خمار قطعتين مصنوع من قماش القطن',
        enDescription:
          'Two piece khemar made of cotton fabric with a soft texture and comfortable to wear for long hours of the day',
      },
    ],
  });

  // create colors and sizes
  await db.color.createMany({
    data: [
      { enName: 'white', arName: 'أبيض', code: '#ffffff' },
      { enName: 'black', arName: 'أسود', code: '#000000' },
      { enName: 'Green', arName: 'أخضر', code: '#407d58' },
      { enName: 'Blue', arName: 'أزرق', code: '#3b5998' },
      { enName: 'Red', arName: 'أحمر', code: '#ff0000' },
      { enName: 'Yellow', arName: 'أصفر', code: '#ffff00' },
      { enName: 'Purple', arName: 'أرجواني', code: '#800080' },
      { enName: 'Orange', arName: 'برتقالي', code: '#ffa500' },
      { enName: 'Pink', arName: 'وردي', code: '#ffc0cb' },
      { enName: 'Brown', arName: 'بني', code: '#a52a2a' },
    ],
  });
  await db.size.createMany({
    data: [
      { name: 'XS' },
      { name: 'S' },
      { name: 'M' },
      { name: 'L' },
      { name: 'XL' },
      { name: 'XXL' },
      { name: 'XXXL' },
      { name: '4XL' },
      { name: '5XL' },
    ],
  });

  // create stocks
  const [products, colors, sizes] = await Promise.all([
    db.product.findMany(),
    db.color.findMany(),
    db.size.findMany(),
  ]);

  await db.stock.createMany({
    data: [
      { productId: products[0].id, colorId: colors[0].id, sizeId: sizes[0].id, quantity: 10 },
      { productId: products[0].id, colorId: colors[1].id, sizeId: sizes[1].id, quantity: 20 },
      { productId: products[0].id, colorId: colors[2].id, sizeId: sizes[2].id, quantity: 30 },
      { productId: products[1].id, colorId: colors[0].id, sizeId: sizes[0].id, quantity: 10 },
      { productId: products[1].id, colorId: colors[1].id, sizeId: sizes[1].id, quantity: 20 },
      { productId: products[1].id, colorId: colors[2].id, sizeId: sizes[2].id, quantity: 30 },
      { productId: products[2].id, colorId: colors[0].id, sizeId: sizes[0].id, quantity: 10 },
      { productId: products[2].id, colorId: colors[1].id, sizeId: sizes[1].id, quantity: 20 },
      { productId: products[2].id, colorId: colors[2].id, sizeId: sizes[2].id, quantity: 30 },
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
    await db.$disconnect();
  });
