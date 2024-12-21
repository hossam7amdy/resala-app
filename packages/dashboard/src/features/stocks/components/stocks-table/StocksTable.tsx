'use client';

import { deleteStock } from '@/actions/stocks';
import { Image, PopconfirmDeleteButton, Table } from '@/components';
import type { GetStockResponse } from '@resala/shared';
import { Button, Flex, InputNumber } from 'antd';
import React, { useState } from 'react';

import { StockColor, useUpdateStocksQuantity } from '../..';

interface StocksTableProps {
  stocks: (GetStockResponse['data'] & { newQuantity?: number })[];
}
export const StocksTable: React.FC<StocksTableProps> = props => {
  const [stocks, setStocks] = useState(props.stocks);
  const { updateStocks, isLoading } = useUpdateStocksQuantity({
    onSuccess: () => {
      setStocks(prevStocks =>
        prevStocks.map(stock => ({
          ...stock,
          quantity: stock.newQuantity || stock.quantity,
          newQuantity: undefined,
        }))
      );
    },
  });

  const handleStockQuantityChange = (stockId: string, quantity: number) => {
    setStocks(prevStocks =>
      prevStocks.map(stock => (stock.id === stockId ? { ...stock, newQuantity: quantity } : stock))
    );
  };

  const handleCancel = () => {
    setStocks(props.stocks);
  };

  const handleSave = () => {
    updateStocks(stocks.map(stock => ({ id: stock.id, quantity: stock.quantity })));
  };

  const isQuantityChanged = stocks.some(
    stock => stock.newQuantity !== undefined && stock.newQuantity !== stock.quantity
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
            render: (qty, stock) => (
              <InputNumber
                size="small"
                min={0}
                max={1000000}
                value={stock.newQuantity || qty}
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
