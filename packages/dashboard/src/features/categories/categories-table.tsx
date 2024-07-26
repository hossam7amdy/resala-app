'use client';

import { deleteCategory } from '@/actions/category';
import { PopconfirmDeleteButton, Tooltip } from '@/components';
import ROUTES from '@/lib/routes';
import { formatDate } from '@/lib/util';
import { EditFilled } from '@ant-design/icons';
import type { GetCategoryResponse, ListCategoriesResponse } from '@resala/shared';
import { Button, Flex, Table } from 'antd';
import Link from 'next/link';

export const CategoryTable: React.FC<{
  query: string | undefined;
  categories: ListCategoriesResponse['data'];
}> = ({ categories, query = '' }) => {
  const filteredCategories = categories.filter(category => {
    if (category.enName.toLowerCase().includes(query.toLowerCase())) return true;
    if (category.arName.toLowerCase().includes(query.toLowerCase())) return true;
  });

  return (
    <Table
      scroll={{ x: true, y: 500 }}
      pagination={{ total: filteredCategories.length, position: ['bottomCenter'] }}
      columns={[
        { title: 'English', dataIndex: 'enName' },
        { title: 'Arabic', dataIndex: 'arName' },
        { title: 'Created Date', dataIndex: 'createdAt' },
        { title: 'Action', dataIndex: 'action' },
      ]}
      dataSource={filteredCategories.map((category: GetCategoryResponse['data']) => ({
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
            <PopconfirmDeleteButton onConfirmDelete={() => deleteCategory(String(category.id))} />
          </Flex>
        ),
      }))}
    />
  );
};
