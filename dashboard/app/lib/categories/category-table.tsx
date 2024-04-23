import type {  GetCategoriesListResponse } from '@resala/shared';
import { Table } from 'antd';

export const CategoryTable = async () => {
  // const response = await callEndpoint<GetCategoriesListRequest, GetCategoriesListResponse>(
  //   ENDPOINT_CONFIGS.listCategories
  // );

  const categories:GetCategoriesListResponse['data'] = [];
  return (
    <Table
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
          title: 'Create Date',
          dataIndex: 'createdAt',
        },
      ]}
      dataSource={categories}
    />
  );
};
