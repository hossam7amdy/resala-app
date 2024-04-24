import { callEndpoint } from '@/lib/fetch';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import type { GetProductsListRequest, GetProductsListResponse } from '@resala/shared';
import { Table } from 'antd';

export const ProductTable = async (query: {
  page: number;
  limit: number;
  query: string;
  deleted: boolean;
}) => {
  const response = await callEndpoint<GetProductsListRequest, GetProductsListResponse>(
    ENDPOINT_CONFIGS.getProductsList,
    { query: query }
  );

  return (
    <Table
      pagination={{
        total: response?.data.pagination.total,
        current: response?.data.pagination.page,
        pageSize: 10,
      }}
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
      dataSource={response?.data.products.map(product => ({
        key: product.id,
        enName: product.enName,
        arName: product.arName,
        createdAt: new Date(product.createdAt).toLocaleString(),
      }))}
    />
  );
};
