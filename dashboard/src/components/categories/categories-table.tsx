import { listAllCategories } from '@/data/category';
import ROUTES from '@/lib/routes';
import { formatDate } from '@/lib/util';
import { Button, Flex, Table } from 'antd';
import Link from 'next/link';

import DeleteButton from './delete-button';

export const CategoryTable = async ({ query }: { query: string }) => {
  const categories = await listAllCategories();

  const filteredCategories = categories.filter(category => {
    // filter category and sub category by query
    if (category.enName.toLowerCase().includes(query.toLowerCase())) return true;
    if (category.arName.toLowerCase().includes(query.toLowerCase())) return true;

    return category.subCategories.some(subCategory => {
      if (subCategory.enName.toLowerCase().includes(query.toLowerCase())) return true;
      if (subCategory.arName.toLowerCase().includes(query.toLowerCase())) return true;

      return false;
    });
  });

  return (
    <Table
      scroll={{ y: 500 }}
      pagination={{ total: filteredCategories.length, pageSize: 10, position: ['bottomCenter'] }}
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
      dataSource={filteredCategories.map(category => ({
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
