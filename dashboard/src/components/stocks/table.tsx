import { deleteStock } from '@/actions/stock';
import { listStocksPaginated } from '@/data/stocks';
import ROUTES from '@/lib/routes';
import { formatDate } from '@/lib/util';
import { EditFilled } from '@ant-design/icons';
import type { DefaultRequestQuery } from '@resala/shared';
import { Button, Flex, Space, Table } from 'antd';
import Link from 'next/link';
import React from 'react';

import DeleteButton from '../ui/delete-button';
import Pagination from '../ui/pagination';
import StockColor from '../ui/stock-color';

interface StocksTableProps {
  searchParams: Pick<DefaultRequestQuery['query'], 'page' | 'limit'>;
}
const StocksTable = async ({ searchParams }: StocksTableProps) => {
  const { pagination, stocks } = await listStocksPaginated(searchParams);

  return (
    <Flex vertical gap={10}>
      <Table
        scroll={{ x: 768, y: 500 }}
        pagination={false}
        columns={[
          { title: 'Product', dataIndex: 'product', key: 'product' },
          { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
          { title: 'Color', dataIndex: 'color', key: 'color' },
          { title: 'Color Name', dataIndex: 'colorName', key: 'colorName' },
          { title: 'Size', dataIndex: 'size', key: 'size' },
          { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
          { title: 'Actions', dataIndex: 'actions', key: 'actions' },
        ]}
        dataSource={stocks.map(stock => ({
          key: stock.id,
          product: stock.product.arName,
          quantity: stock.quantity,
          updatedAt: formatDate(stock.updatedAt),
          color: <StockColor color={stock.color.code} />,
          colorName: `${stock.color.enName} | ${stock.color.arName}`,
          size: stock.size.name,
          actions: (
            <Space size="small">
              <Button size="small" type="link">
                <Link href={ROUTES.EDIT_STOCK(stock.id)}>
                  <EditFilled />
                </Link>
              </Button>

              <DeleteButton deleteAction={deleteStock.bind(null, stock.id)} />
            </Space>
          ),
        }))}
      />
      <Flex justify="center">
        <Pagination totalPages={pagination.total} />
      </Flex>
    </Flex>
  );
};

export default StocksTable;
