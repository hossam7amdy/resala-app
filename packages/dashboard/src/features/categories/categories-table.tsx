import { deleteCategory } from '@/actions/category';
import { DeleteButton, Tooltip } from '@/components';
import { listAllCategories } from '@/data/category';
import ROUTES from '@/lib/routes';
import { formatDate } from '@/lib/util';
import { EditFilled } from '@ant-design/icons';
import { type GetCategoryResponse } from '@resala/shared';
import { Button, Flex, Table } from 'antd';
import Link from 'next/link';

export const CategoryTable = async ({ query }: { query: string }) => {
  const categories = await listAllCategories();

  const filteredCategories = categories.filter(category => {
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
        { title: 'Created Date', dataIndex: 'createdAt' },
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
            <Tooltip title="Edit">
              <Link href={ROUTES.EDIT_CATEGORY(category.id)}>
                <EditFilled />
              </Link>
            </Tooltip>
          }
        />
        <DeleteButton deleteAction={deleteCategory.bind(null, String(category.id))} />
      </Flex>
    ),
  };
};
