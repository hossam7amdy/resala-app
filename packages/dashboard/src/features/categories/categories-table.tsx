'use client';

import { PopconfirmDeleteButton, ResalaTooltip, Table } from '@/components';
import { deleteCategory } from '@/fetch/category';
import { ROUTES } from '@/routes';
import { formatDate } from '@/utils/date-time-formatter';
import { EditOutlined } from '@ant-design/icons';
import type { GetCategoryResponse, ListCategoriesResponse } from '@resala/shared';
import { Button, Flex } from 'antd';
import Link from 'next/link';

const CategoryTable: React.FC<{
  search: string | undefined;
  categories: ListCategoriesResponse['data'];
}> = ({ categories, search = '' }) => {
  const filteredCategories = categories.filter(category => {
    if (category.enName.toLowerCase().includes(search.toLowerCase())) return true;
    if (category.arName.toLowerCase().includes(search.toLowerCase())) return true;
  });

  return (
    <Table
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
                <ResalaTooltip title="Edit">
                  <Link href={ROUTES.EDIT_CATEGORY(category.id)}>
                    <EditOutlined />
                  </Link>
                </ResalaTooltip>
              }
            />
            <PopconfirmDeleteButton onConfirmDelete={() => deleteCategory(String(category.id))} />
          </Flex>
        ),
      }))}
    />
  );
};

export { CategoryTable };
