import { deleteStock } from '@/actions/stock';
import { Tooltip } from '@/components';
import { DeleteButton } from '@/components';
import ROUTES from '@/lib/routes';
import { EditFilled } from '@ant-design/icons';
import type { GetStockResponse } from '@resala/shared';
import { Button, Space, Table } from 'antd';
import Link from 'next/link';
import React from 'react';

import { StockQuantity } from '.';

export const StockSizes: React.FC<{ sizes: GetStockResponse['data']['sizes'] }> = ({ sizes }) => (
  <Table
    bordered
    pagination={false}
    dataSource={sizes}
    rowKey={record => `${record.size}`}
    columns={[
      {
        title: 'Size',
        dataIndex: 'size',
        align: 'center',
        width: '33%',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        width: '34%',
        align: 'center',
        render: (quantity: number) => <StockQuantity quantity={quantity} />,
      },
      {
        key: 'stockId',
        title: 'Actions',
        dataIndex: 'stockId',
        width: 150,
        align: 'center',
        render: (stockId: number) => (
          <Space size="small">
            <Tooltip title="Edit">
              <Button size="small" type="link">
                <Link href={ROUTES.EDIT_STOCK(stockId)}>
                  <EditFilled />
                </Link>
              </Button>
            </Tooltip>

            <DeleteButton deleteAction={deleteStock.bind(null, stockId)} />
          </Space>
        ),
      },
    ]}
  />
);
