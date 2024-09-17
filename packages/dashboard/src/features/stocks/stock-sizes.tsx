import { ResalaTooltip } from '@/components';
import { PopconfirmDeleteButton } from '@/components';
import { deleteStock } from '@/fetch/stocks';
import { ROUTES } from '@/utils/routes';
import { EditOutlined } from '@ant-design/icons';
import type { GetStockResponse } from '@resala/shared';
import { Space, Table } from 'antd';
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
            <ResalaTooltip title="Edit">
              <Link href={ROUTES.EDIT_STOCK(stockId)}>
                <EditOutlined />
              </Link>
            </ResalaTooltip>

            <PopconfirmDeleteButton onConfirmDelete={() => deleteStock(stockId)} />
          </Space>
        ),
      },
    ]}
  />
);
