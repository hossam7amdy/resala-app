'use client';

import { Pagination, PopconfirmDeleteButton, Table } from '@/components';
import { deleteStock } from '@/fetch/stocks';
import type { ListStocksResponse } from '@resala/shared';
import { Flex, Space } from 'antd';
import React from 'react';

import { StockColor, StockColorImages, StockQuantity, StockSizes } from '.';
import { UploadModal } from './upload-modal';

export const StocksTable: React.FC<ListStocksResponse['data']> = ({ pagination, stocks }) => {
  return (
    <Flex vertical gap={10}>
      <Table
        rowClassName={() => 'table-row-pointer'}
        bordered
        rowKey={s => `${s.product.id}-${s.color.id}`}
        pagination={false}
        dataSource={stocks}
        expandable={{
          expandRowByClick: true,
          expandedRowRender: stock => <StockSizes sizes={stock.sizes} />,
        }}
        columns={[
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
            width: 100,
            align: 'center',
            render: color => <StockColor color={color.code} />,
          },
          {
            title: 'Color Name',
            key: 'colorName',
            dataIndex: 'color',
            width: 240,
            align: 'center',
            render: color => `${color.enName} | ${color.arName}`,
          },
          {
            title: 'Images',
            dataIndex: 'images',
            key: 'images',
            width: 120,
            align: 'center',
            render: (_, stock) => <StockColorImages stock={stock} />,
            onCell: () => ({
              onClick: e => {
                e.stopPropagation();
              },
            }),
          },
          {
            title: 'Sizes',
            dataIndex: 'sizes',
            key: 'sizes',
            align: 'center',
            width: 240,
            render: (sizes: { size: string }[]) =>
              sizes.length ? `${sizes.map(s => s.size).join(', ')}` : 'No Sizes',
          },
          {
            title: 'Total Qty',
            dataIndex: 'sizes',
            key: 'sizes',
            width: 120,
            align: 'center',
            render: (sizes: { quantity: number }[]) => (
              <StockQuantity quantity={sizes.reduce((acc, size) => acc + size.quantity, 0)} />
            ),
          },
          {
            title: 'Actions',
            width: 100,
            align: 'center',
            render: (_, stock) => (
              <Space>
                <UploadModal stock={stock} />
                <PopconfirmDeleteButton
                  onConfirmDelete={() => deleteStock(stock.sizes[0].stockId)}
                />
              </Space>
            ),
            onCell: () => ({
              onClick: e => {
                e.stopPropagation();
              },
            }),
          },
        ]}
      />
      <Flex justify="center">
        <Pagination totalPages={pagination.total} />
      </Flex>
    </Flex>
  );
};
