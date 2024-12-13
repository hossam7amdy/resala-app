'use client';

import { PopconfirmDeleteButton, Table } from '@/components';
import { deleteStock } from '@/fetch/stocks';
import type { GetStockResponse, ListStocksResponse } from '@resala/shared';
import { Flex, Image } from 'antd';
import React from 'react';

import { StockColor } from '.';

interface StocksTableProps {
  stocks: ListStocksResponse['data'];
}
export const StocksTable: React.FC<StocksTableProps> = ({ stocks }) => {
  return (
    <Table<GetStockResponse['data']>
      rowHoverable
      rowKey={stock => stock.id}
      pagination={false}
      dataSource={stocks}
      columns={[
        {
          title: '',
          dataIndex: 'image',
          width: 100,
          align: 'center',
          render: image => <Image src={image?.imageUrl} alt="Product" width={'100%'} />,
        },
        {
          title: 'Product',
          dataIndex: 'product',
          key: 'product',
          width: 240,
          align: 'center',
          render: product => `${product.enName} | ${product.arName}`,
        },
        {
          title: 'Color',
          dataIndex: 'color',
          key: 'color',
          render: color => (
            <Flex align="center">
              <StockColor color={color.code} /> {color.enName} | {color.arName}
            </Flex>
          ),
        },
        {
          title: 'Size',
          dataIndex: 'size',
          key: 'size',
          align: 'center',
          render: size => size.name,
        },
        {
          title: 'Available',
          dataIndex: 'quantity',
          key: 'quantity',
          width: 120,
          align: 'center',
        },
        {
          title: 'Actions',
          width: 100,
          align: 'center',
          render: (_, stock) => (
            <PopconfirmDeleteButton onConfirmDelete={() => deleteStock(stock.id)} />
          ),
          onCell: () => ({
            onClick: e => {
              e.stopPropagation();
            },
          }),
        },
      ]}
    />
  );
};
