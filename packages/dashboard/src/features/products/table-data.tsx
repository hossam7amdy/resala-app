'use client';

import { deleteProduct } from '@/actions/product';
import { PopconfirmDeleteButton } from '@/components';
import { Tooltip } from '@/components';
import ROUTES from '@/lib/routes';
import { formatCurrency, formatDate } from '@/lib/util';
import { EditFilled } from '@ant-design/icons';
import type { Category, GetProductsListResponse, Product } from '@resala/shared';
import { Button, Image, Space, Table } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export const TableData: React.FC<{ products: GetProductsListResponse['data']['products'] }> = ({
  products,
}) => {
  const router = useRouter();

  return (
    <Table
      rowKey={record => record.id}
      onRow={record => {
        return {
          style: { cursor: 'pointer' },
          onClick: () => {
            router.push(ROUTES.PRODUCT_STOCKS(record.id));
          },
        };
      }}
      scroll={{ x: true, y: 500 }}
      pagination={false}
      columns={[
        {
          title: 'Image',
          dataIndex: 'imageUrl',
          onCell: () => ({
            onClick: e => e.stopPropagation(),
          }),
          render: (imageUrl: string, product: Product) => (
            <Image src={imageUrl} width={50} alt={product.enDescription} />
          ),
        },
        { title: 'English', dataIndex: 'enName' },
        { title: 'Arabic', dataIndex: 'arName' },
        {
          title: 'Category',
          dataIndex: 'category',
          render: (category: Category) => category.arName,
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
              <Tooltip title="Edit">
                <Button size="small" type="link">
                  <Link href={ROUTES.EDIT_PRODUCT(product.id)}>
                    <EditFilled />
                  </Link>
                </Button>
              </Tooltip>

              <PopconfirmDeleteButton onConfirmDelete={() => deleteProduct(product.id)} />
            </Space>
          ),
        },
      ]}
      dataSource={products}
    />
  );
};
