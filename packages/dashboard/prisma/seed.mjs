import { PrismaClient } from '@prisma/client';
import process from 'process';

const db = new PrismaClient({
  transactionOptions: {
    timeout: 10000,
  },
});

const main = async () => {
  console.log('seeding database...');

  await db.$transaction(async trx => {
    // create users
    await trx.user.createMany({
      data: [
        {
          email: `customer@resala.com`,
          phoneNumber: `+201500000000`,
          firstName: `Resala`,
          lastName: `Customer`,
          role: 'user',
          name: 'Resala Customer',
          locale: 'en-US',
          birthDate: new Date('1990-01-01').toISOString(),
        },
        {
          email: `admin@resala.com`,
          phoneNumber: `+201500000001`,
          firstName: 'Resala',
          lastName: 'Admin',
          role: 'admin',
          name: 'Resala Admin',
          locale: 'ar-EG',
        },
        {
          email: `staff@resala.com`,
          phoneNumber: `+201500000002`,
          firstName: `Resala`,
          lastName: `Moderator`,
          role: 'staff',
          name: 'Resala Moderator',
          locale: 'ar',
        },
      ],
    });

    // create main categories
    const categories = await trx.category.createManyAndReturn({
      data: [
        { arName: 'نقاب', enName: 'Niqab' },
        { arName: 'إسدالات', enName: 'Prayer Set' },
        { arName: 'خمار', enName: 'Khemar' },
      ],
    });

    const medias = await trx.media.createManyAndReturn({
      data: [
        {
          id: 'product-1',
          url: 'https://cdn.resala.live/dummy/product-1.webp',
          filename: 'product-1.webp',
          size: 21 * 1024,
        },
        {
          id: 'product-2',
          url: 'https://cdn.resala.live/dummy/product-2.webp',
          filename: 'product-2.webp',
          size: 28 * 1024,
        },
      ],
    });

    // create products
    const products = await trx.product.createManyAndReturn({
      data: [
        {
          arName: 'نقاب قطعة واحدة',
          enName: 'One Piece Niqab',
          price: 50,
          mediaId: medias[0].id,
          arDescription: 'نقاب قطعة واحدة مصنوع من قماش القطن',
          enDescription:
            'One piece niqab made of cotton fabric with a soft texture and comfortable to wear for long hours of the day',
        },
        {
          arName: 'اسدال صلاة',
          enName: 'Prayer Set',
          price: 100,
          mediaId: medias[1].id,
          arDescription: 'اسدال صلاة مصنوع من قماش القطن',
          enDescription:
            'Prayer set made of cotton fabric with a soft texture and comfortable to wear for long hours of the day',
        },
        {
          arName: 'خمار قطعتين',
          enName: 'Two Piece Khemar',
          price: 70,
          mediaId: medias[0].id,
          arDescription: 'خمار قطعتين مصنوع من قماش القطن',
          enDescription:
            'Two piece khemar made of cotton fabric with a soft texture and comfortable to wear for long hours of the day',
        },
      ],
    });

    // connect products with categories
    await Promise.all(
      products.map((_, index) =>
        trx.category.update({
          data: { products: { connect: { id: products[index].id } } },
          where: { id: categories[index].id },
        })
      )
    );

    // create colors and sizes
    const colors = await trx.color.createManyAndReturn({
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
    const sizes = await trx.size.createManyAndReturn({
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
    await trx.stock.createMany({
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
