import { callEndpoint } from '@/app/lib/fetch';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import type { GetCategoriesListRequest, GetCategoriesListResponse } from '@resala/shared';
import { Table } from 'antd';

export const CategoryTable = async () => {
  const response = await callEndpoint<GetCategoriesListRequest, GetCategoriesListResponse>(
    ENDPOINT_CONFIGS.listCategories
  );

  return (
    <Table
      pagination={{ total: response?.data.length, pageSize: 10 }}
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
          title: 'Create Date',
          dataIndex: 'createdAt',
        },
      ]}
      dataSource={response?.data.map(category => ({
        key: category.id,
        enName: category.enName,
        arName: category.arName,
        createdAt: new Date(category.createdAt).toLocaleString(),
      }))}
    />
  );
};
