'use client';

import { Image, PopconfirmDeleteButton, ResalaTooltip } from '@/components';
import { deleteProduct } from '@/fetch/products';
import { ROUTES } from '@/routes';
import { formatCurrency } from '@/utils/currency-formatter';
import { formatDate } from '@/utils/date-time-formatter';
import { EditOutlined } from '@ant-design/icons';
import type { Category, ListProductsResponse, Product } from '@resala/shared';
import { Button, Space, Table } from 'antd';
import Link from 'next/link';
import React from 'react';

export const ProductsTable: React.FC<{ products: ListProductsResponse['data']['products'] }> = ({
  products,
}) => {
  return (
    <Table<Product>
      rowHoverable
      scroll={{ x: 768, y: 500 }}
      className="w-full"
      dataSource={products}
      rowKey={record => record.id}
      rowClassName={() => 'cursor-pointer'}
      pagination={false}
      expandable={{
        expandRowByClick: true,
        expandedRowRender: product => (
          <Table
            rowKey={record => record.id}
            dataSource={[product]}
            pagination={false}
            columns={[
              {
                title: 'Description',
                dataIndex: 'enDescription',
                key: 'enDescription',
                width: '50%',
              },
              {
                title: 'الوصف',
                dataIndex: 'arDescription',
                key: 'arDescription',
                width: '50%',
                align: 'end',
              },
            ]}
          />
        ),
      }}
      columns={[
        {
          title: '',
          dataIndex: 'imageUrl',
          onCell: () => ({
            onClick: e => e.stopPropagation(),
          }),
          render: (imageUrl: string, product: Product) => (
            <Image src={imageUrl} width={50} alt={product.enDescription} />
          ),
        },
        {
          title: 'Product',
          onCell: () => ({
            onClick: e => e.stopPropagation(),
          }),
          render: (_, product) => (
            <Link href={ROUTES.PRODUCT_STOCKS(product.id)}>
              <p>{product.enName}</p>
              <p>{product.arName}</p>
            </Link>
          ),
        },
        {
          title: 'Category',
          dataIndex: 'category',
          render: (category: Category) => (
            <>
              <p>{category.enName}</p>
              <p>{category.arName}</p>
            </>
          ),
        },
        {
          title: 'Price',
          dataIndex: 'price',
          render: (price: number) => formatCurrency(price),
        },
        {
          title: 'Date',
          dataIndex: 'createdAt',
          render: (date: string) => formatDate(new Date(date)),
        },
        {
          title: 'Actions',
          dataIndex: 'actions',
          align: 'center',
          onCell: () => ({
            onClick: e => e.stopPropagation(),
          }),
          render: (_, product) => (
            <Space size="small">
              <ResalaTooltip title="Edit">
                <Button size="small" type="link">
                  <Link href={ROUTES.EDIT_PRODUCT(product.id)}>
                    <EditOutlined />
                  </Link>
                </Button>
              </ResalaTooltip>

              <PopconfirmDeleteButton onConfirmDelete={() => deleteProduct(product.id)} />
            </Space>
          ),
        },
      ]}
    />
  );
};
