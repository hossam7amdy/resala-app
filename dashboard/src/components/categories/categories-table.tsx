import { listAllCategories } from '@/data/category';
import ROUTES from '@/lib/routes';
import { formatDate } from '@/lib/util';
import { Button, Flex, Table } from 'antd';
import Link from 'next/link';

import DeleteButton from './delete-button';

export const CategoryTable = async () => {
  const categories = await listAllCategories();

  return (
    <Table
      scroll={{ y: 500 }}
      pagination={{ total: categories.length, pageSize: 10 }}
      columns={[
        {
          title: 'English',
          dataIndex: 'enName',
        },
        {
          title: 'Arabic',
          dataIndex: 'arName',
        },
        {
          title: '# of Sub-Categories',
          dataIndex: 'subCategories',
        },
        {
          title: 'Create Date',
          dataIndex: 'createdAt',
        },
        {
          title: 'Action',
          dataIndex: 'action',
        },
      ]}
      dataSource={categories.map(category => ({
        key: category.id,
        enName: category.enName,
        arName: category.arName,
        subCategories: category.subCategories.length,
        createdAt: formatDate(new Date(category.createdAt)),
        action: (
          <Flex>
            <Button type="link">
              <Link href={ROUTES.EDIT_CATEGORY(category.id)}>Edit</Link>
            </Button>
            <DeleteButton id={category.id} />
          </Flex>
        ),
        children: category.subCategories.map(subCategory => ({
          key: subCategory.id,
          enName: subCategory.enName,
          arName: subCategory.arName,
          subCategories: null,
          createdAt: formatDate(new Date(subCategory.createdAt)),
          action: (
            <Flex>
              <Button type="link">
                <Link href={ROUTES.EDIT_CATEGORY(subCategory.id)}>Edit</Link>
              </Button>
              <DeleteButton id={subCategory.id} />
            </Flex>
          ),
        })),
      }))}
    />
  );
};
