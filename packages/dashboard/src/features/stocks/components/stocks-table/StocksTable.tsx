'use client';

import { Image, Table } from '@/components';
import type { GetStockResponse } from '@resala/shared';
import { Button, Flex, InputNumber, type TableProps } from 'antd';
import React, { useEffect, useState } from 'react';

import { StockColor, useUpdateStocksQuantity } from '../..';

type StockType = GetStockResponse['data'];

interface StocksTableProps {
  stocks: StockType[];
}
export const StocksTable: React.FC<StocksTableProps> = props => {
  const [stocks, setStocks] = useState(props.stocks);
  const { updateStocks, isLoading } = useUpdateStocksQuantity({});

  useEffect(() => {
    // Reset stocks when props change (i.e. when the parent component fetches new data)
    setStocks(props.stocks);
  }, [props.stocks]);

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

  const tableTitle: TableProps<StockType>['title'] = data => {
    const currentQty = data.reduce((acc, stock) => acc + stock.quantity, 0);
    const originalQty = props.stocks.reduce((acc, stock) => acc + stock.quantity, 0);
    const isOriginalQtyChanged = currentQty !== originalQty;

    return (
      <Flex gap={5} justify="end">
        <Button size="small" disabled={isLoading || !isOriginalQtyChanged} onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          size="small"
          type="primary"
          onClick={handleSave}
          loading={isLoading}
          disabled={!isOriginalQtyChanged}
        >
          Save
        </Button>
      </Flex>
    );
  };

  return (
    <Table
      rowHoverable
      title={tableTitle}
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
              <Image src={image?.imageUrl} alt="Product" width={50} />
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
        // {
        //   title: 'Actions',
        //   width: 100,
        //   align: 'center',
        //   dataIndex: 'id',
        //   render: id => <DeleteStockButton id={id} isLastItem={stocks.length === 1} />,
        //   onCell: () => ({
        //     onClick: e => {
        //       e.stopPropagation();
        //     },
        //   }),
        // },
      ]}
    />
  );
};
