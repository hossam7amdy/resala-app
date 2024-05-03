import { deleteStock } from '@/actions/stock';
import DeleteButton from '@/components/ui/delete-button';
import StockColor from '@/components/ui/stock-color';
import { getProductStocks } from '@/data/product';
import ROUTES from '@/lib/routes';
import { formatDate } from '@/lib/util';
import { EditFilled } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Product Stocks',
};

const ProductStocksPage = async ({ params }: { params: { id: string } }) => {
  const stocks = await getProductStocks(params.id);

  return (
    <Table
      pagination={{
        current: 1,
        pageSize: 10,
        total: stocks.length,
        position: ['bottomCenter'],
      }}
      dataSource={stocks.map(stock => ({
        key: stock.id,
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
      columns={[
        {
          title: 'Color',
          dataIndex: 'color',
          key: 'color',
        },
        {
          title: 'Color Name',
          dataIndex: 'colorName',
          key: 'colorName',
        },
        {
          title: 'Size',
          dataIndex: 'size',
          key: 'size',
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
        },
        {
          title: 'Updated At',
          dataIndex: 'updatedAt',
          key: 'updatedAt',
        },
        {
          title: 'Actions',
          dataIndex: 'actions',
          key: 'actions',
          align: 'center',
        },
      ]}
    />
  );
};

export default ProductStocksPage;
