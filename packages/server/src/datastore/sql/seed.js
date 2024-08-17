import { PrismaClient } from '@prisma/client';
import process from 'process';

const prisma = new PrismaClient();

const main = async () => {
  // create users
  await prisma.user.createMany({
    data: [
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
    ],
  });

  // create main categories
  await prisma.category.createMany({
    data: [
      { arName: 'نقاب', enName: 'Niqab' },
      { arName: 'إسدالات', enName: 'Prayer Set' },
      { arName: 'خمار', enName: 'Khemar' },
    ],
  });

  // create colors and sizes
  await prisma.color.createMany({
    data: [
      { enName: 'white', arName: 'أبيض', code: '#ffffff' },
      { enName: 'black', arName: 'أسود', code: '#000000' },
      { enName: 'Green', arName: 'أخضر', code: '#407d58' },
    ],
  });
  await prisma.size.createMany({
    data: [
      { name: 'XS' },
      { name: 'S' },
      { name: 'M' },
      { name: 'L' },
      { name: 'XL' },
      { name: 'XXL' },
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
