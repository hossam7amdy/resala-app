import { listTopProducts } from '@/data/dashboard';
import { formatCurrency } from '@/utils/currency-formatter';
import { Table } from 'antd';
import React from 'react';

const TopProducts = async () => {
  const data = await listTopProducts();

  return (
    <Table
      size="small"
      pagination={false}
      scroll={{ y: 300 }}
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Items Sold',
          dataIndex: 'unitsSold',
          key: 'unitsSold',
          align: 'center',
        },
      ]}
      dataSource={data.map(({ product, unitsSold }) => ({
        key: product.id,
        name: product.enName,
        price: formatCurrency(product.price),
        unitsSold: <b>{unitsSold}</b>,
      }))}
    />
  );
};

export default TopProducts;
