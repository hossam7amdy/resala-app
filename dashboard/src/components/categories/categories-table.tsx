import { deleteCategory } from '@/actions/category';
import { listAllCategories } from '@/data/category';
import ROUTES from '@/lib/routes';
import { formatDate } from '@/lib/util';
import { EditFilled } from '@ant-design/icons';
import { type GetCategoryResponse } from '@resala/shared';
import { Button, Flex, Table } from 'antd';
import Link from 'next/link';

import DeleteButton from '../ui/delete-button';
import DisableButton from './disable-button';

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
      scroll={{ x: 768, y: 500 }}
      pagination={{ total: filteredCategories.length, pageSize: 10, position: ['bottomCenter'] }}
      columns={[
        { title: 'English', dataIndex: 'enName' },
        { title: 'Arabic', dataIndex: 'arName' },
        { title: '# of Sub-Categories', dataIndex: 'subCategories' },
        { title: 'Is Active', dataIndex: 'deletedAt' },
        { title: 'Create Date', dataIndex: 'createdAt' },
        { title: 'Action', dataIndex: 'action' },
      ]}
      dataSource={filteredCategories.map(category => ({
        ...renderRow(category),
        children: category.subCategories.map(subCategory =>
          renderRow({ ...subCategory, subCategories: [] })
        ),
      }))}
    />
  );
};

const renderRow = (category: GetCategoryResponse['data']) => {
  return {
    key: category.id,
    enName: category.enName,
    arName: category.arName,
    subCategories: category.subCategories.length || null,
    deletedAt: <DisableButton category={category} />,
    createdAt: formatDate(new Date(category.createdAt)),
    action: (
      <Flex>
        <Button
          type="link"
          icon={
            <Link href={ROUTES.EDIT_CATEGORY(category.id)}>
              <EditFilled />
            </Link>
          }
        />
        <DeleteButton deleteAction={deleteCategory.bind(null, String(category.id))} />
      </Flex>
    ),
  };
};
