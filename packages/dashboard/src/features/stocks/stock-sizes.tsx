import { deleteStock } from '@/actions/stock';
import DeleteButton from '@/components/delete-button';
import StockQuantity from '@/features/stocks/stock-quantity';
import ROUTES from '@/lib/routes';
import { EditFilled } from '@ant-design/icons';
import type { GetStockResponse } from '@resala/shared';
import { Button, Space, Table } from 'antd';
import Link from 'next/link';
import React from 'react';

const StockSizes: React.FC<{ sizes: GetStockResponse['data']['sizes'] }> = ({ sizes }) => (
  <Table
    bordered
    rowKey={size => size.sizeId}
    pagination={false}
    dataSource={sizes}
    columns={[
      {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
        align: 'center',
        width: 240,
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        width: 120,
        align: 'center',
        render: quantity => <StockQuantity quantity={quantity} />,
      },
      {
        key: 'stockId',
        title: 'Actions',
        dataIndex: 'stockId',
        width: 150,
        align: 'center',
        render: (stockId: number) => (
          <Space size="small">
            <Button size="small" type="link">
              <Link href={ROUTES.EDIT_STOCK(stockId)}>
                <EditFilled />
              </Link>
            </Button>

            <DeleteButton deleteAction={deleteStock.bind(null, stockId)} />
          </Space>
        ),
      },
    ]}
  />
);

export default StockSizes;
