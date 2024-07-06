import { deleteCategory } from '@/actions/category';
import { listAllCategories } from '@/data/category';
import ROUTES from '@/lib/routes';
import { formatDate } from '@/lib/util';
import { EditFilled } from '@ant-design/icons';
import { type GetCategoryResponse } from '@resala/shared';
import { Button, Flex, Table } from 'antd';
import Link from 'next/link';

import DeleteButton from '../../components/delete-button';

export const CategoryTable = async ({ query }: { query: string }) => {
  const categories = await listAllCategories();

  const filteredCategories = categories.filter(category => {
    // filter category and sub category by query
    if (category.enName.toLowerCase().includes(query.toLowerCase())) return true;
    if (category.arName.toLowerCase().includes(query.toLowerCase())) return true;
  });

  return (
    <Table
      scroll={{ x: true, y: 500 }}
      pagination={{ total: filteredCategories.length, pageSize: 10, position: ['bottomCenter'] }}
      columns={[
        { title: 'English', dataIndex: 'enName' },
        { title: 'Arabic', dataIndex: 'arName' },
        { title: 'Create Date', dataIndex: 'createdAt' },
        { title: 'Action', dataIndex: 'action' },
      ]}
      dataSource={filteredCategories.map(renderRow)}
    />
  );
};

const renderRow = (category: GetCategoryResponse['data']) => {
  return {
    key: category.id,
    enName: category.enName,
    arName: category.arName,
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
