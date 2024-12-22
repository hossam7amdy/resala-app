'use client';

import { deleteStock } from '@/actions/stocks';
import { Image, PopconfirmDeleteButton, Table } from '@/components';
import type { GetStockResponse } from '@resala/shared';
import { Button, Flex, InputNumber } from 'antd';
import React, { useState } from 'react';

import { StockColor, useUpdateStocksQuantity } from '../..';

interface StocksTableProps {
  stocks: GetStockResponse['data'][];
}
export const StocksTable: React.FC<StocksTableProps> = props => {
  const [stocks, setStocks] = useState(props.stocks);
  const { updateStocks, isLoading } = useUpdateStocksQuantity({});

  const handleStockQuantityChange = (stockId: string, quantity: number) => {
    setStocks(prevStocks =>
      prevStocks.map(stock => (stock.id === stockId ? { ...stock, quantity } : stock))
    );
  };

  const handleCancel = () => {
    setStocks(props.stocks);
  };

  const handleSave = () => {
    updateStocks(stocks.map(stock => ({ id: stock.id, quantity: stock.quantity })));
  };

  const isQuantityChanged = stocks.some(
    stock => props.stocks.find(s => s.id === stock.id)?.quantity !== stock.quantity
  );

  return (
    <>
      <Table
        rowHoverable
        title={() => (
          <Flex gap={5} justify="end">
            <Button size="small" disabled={isLoading || !isQuantityChanged} onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              disabled={!isQuantityChanged}
              size="small"
              type="primary"
              onClick={handleSave}
              loading={isLoading}
            >
              Save
            </Button>
          </Flex>
        )}
        rowKey={stock => stock.id}
        pagination={false}
        dataSource={stocks}
        columns={[
          {
            title: '',
            dataIndex: 'image',
            align: 'center',
            width: 55,
            render: (image, stock) => (
              <Image.PreviewGroup items={stock.images.map(image => image.imageUrl)}>
                <Image src={image.imageUrl} alt="Product" width={50} />
              </Image.PreviewGroup>
            ),
          },
          {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            minWidth: 150,
            align: 'left',
            render: product => (
              <>
                <p>{product.arName}</p>
                <p>{product.enName}</p>
              </>
            ),
          },
          {
            title: 'Variant',
            width: 200,
            dataIndex: 'color',
            render: (color, stocks) => (
              <Flex align="center" gap={5}>
                <StockColor color={color.code} />
                <span>{color.enName.toUpperCase()}</span> |{' '}
                <span>{stocks.size.name.toUpperCase()}</span>
              </Flex>
            ),
          },
          {
            title: 'Available',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 120,
            align: 'center',
            render: (qty, stock) => (
              <InputNumber
                size="small"
                min={0}
                max={1000000}
                value={qty}
                onChange={value => {
                  handleStockQuantityChange(stock.id, value);
                }}
              />
            ),
          },
          {
            title: 'Actions',
            width: 100,
            align: 'center',
            dataIndex: 'id',
            render: id => (
              <PopconfirmDeleteButton onConfirmDelete={() => deleteStock(id)}>
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
    </>
  );
};
