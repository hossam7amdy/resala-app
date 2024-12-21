'use client';

import { Image, PopconfirmDeleteButton, Table } from '@/components';
import { deleteStock } from '@/fetch/stocks';
import type { GetStockResponse, ListStocksResponse } from '@resala/shared';
import { Flex } from 'antd';
import React from 'react';

import { StockColor } from '../..';

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
          width: 75,
          align: 'center',
          render: image => <Image src={image.imageUrl} alt="Product" width={'100%'} />,
        },
        {
          title: 'Product',
          dataIndex: 'product',
          key: 'product',
          minWidth: 240,
          align: 'left',
          render: product => (
            <>
              <p>{product.arName}</p>
              <p>{product.enName}</p>
            </>
          ),
        },
        {
          title: 'Color',
          dataIndex: 'color',
          key: 'color',
          width: 200,
          render: color => (
            <Flex align="center" gap={5}>
              <StockColor color={color.code} />
              <div>
                <p>{color.arName}</p>
                <p>{color.enName}</p>
              </div>
            </Flex>
          ),
        },
        {
          title: 'Size',
          dataIndex: 'size',
          key: 'size',
          align: 'center',
          width: 100,
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
            <PopconfirmDeleteButton onConfirmDelete={() => deleteStock(stock.id)}>
              Delete
            </PopconfirmDeleteButton>
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
