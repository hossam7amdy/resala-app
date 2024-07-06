'use client';

import { Pagination } from '@/components';
import type { GetStocksListResponse } from '@resala/shared';
import { Flex, Table } from 'antd';
import React, { useState } from 'react';

import { StockColor, StockColorImages, StockQuantity, StockSizes } from '.';

const StocksTable: React.FC<GetStocksListResponse['data']> = ({ pagination, stocks }) => {
  const [viewImages, setViewImages] = useState(false);

  return (
    <Flex vertical gap={10}>
      <Table
        rowClassName={() => 'cursor-pointer'}
        bordered
        rowKey={stock => stock.product.id}
        scroll={{ x: true, y: 500 }}
        pagination={false}
        dataSource={stocks}
        expandable={{
          expandRowByClick: true,
          expandedRowRender: stock =>
            !viewImages ? (
              <StockSizes sizes={stock.sizes} />
            ) : (
              <StockColorImages
                images={stock.images.map(img => ({ ...img, productId: stock.product.id }))}
              />
            ),
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
            render: images => `${images.length}`,
            onCell: () => ({
              onClick: () => {
                setViewImages(true);
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
            onCell: () => ({
              onClick: () => {
                setViewImages(false);
              },
            }),
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
            onCell: () => ({
              onClick: () => {
                setViewImages(false);
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

export default StocksTable;
