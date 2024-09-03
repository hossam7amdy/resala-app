'use client';

import { deleteProduct } from '@/actions/product';
import { Image, PopconfirmDeleteButton, ResalaTooltip, Table } from '@/components';
import { formatCurrency } from '@/utils/currency-formatter';
import { formatDate } from '@/utils/date-time-formatter';
import { ROUTES } from '@/utils/routes';
import { EditOutlined, SelectOutlined } from '@ant-design/icons';
import type { Category, ListProductsResponse, Product } from '@resala/shared';
import { Button, Space } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export const ProductsTable: React.FC<{ products: ListProductsResponse['data']['products'] }> = ({
  products,
}) => {
  const router = useRouter();

  return (
    <Table
      dataSource={products}
      rowKey={record => record.id}
      rowClassName={() => 'table-row-pointer'}
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
          title: 'ID',
          dataIndex: 'id',
          onCell: () => ({
            onClick: e => e.stopPropagation(),
          }),
          render: (id: number) => (
            <Button size="small" type="link" onClick={() => router.push(ROUTES.PRODUCT_STOCKS(id))}>
              {id} <SelectOutlined className="rotate-90" />
            </Button>
          ),
        },
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
