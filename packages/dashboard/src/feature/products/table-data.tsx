import { deleteProduct } from '@/actions/product';
import { DeleteButton } from '@/component/delete-button';
import ROUTES from '@/lib/routes';
import { formatCurrency, formatDate } from '@/lib/util';
import { EditFilled, EyeFilled, UploadOutlined } from '@ant-design/icons';
import type { GetProductsListResponse } from '@resala/shared';
import { Button, Image, Space, Table } from 'antd';
import Link from 'next/link';
import React from 'react';

export const TableData: React.FC<{ products: GetProductsListResponse['data']['products'] }> = ({
  products,
}) => {
  return (
    <Table
      scroll={{ x: 768, y: 500 }}
      pagination={false}
      columns={[
        { title: 'Image', dataIndex: 'imageUrl' },
        { title: 'English', dataIndex: 'enName' },
        { title: 'Arabic', dataIndex: 'arName' },
        { title: 'Category', dataIndex: 'category' },
        { title: 'Price', dataIndex: 'price' },
        { title: 'Create Date', dataIndex: 'createdAt' },
        { title: 'Actions', dataIndex: 'actions', align: 'center' },
      ]}
      dataSource={products.map(product => ({
        key: product.id,
        imageUrl: <Image src={product.imageUrl} width={50} alt={product.enDescription} />,
        enName: product.enName,
        arName: product.arName,
        category: product.category.arName,
        price: formatCurrency(product.price),
        createdAt: formatDate(product.createdAt),
        actions: (
          <Space size="small">
            <Button size="small" type="link">
              <Link href={ROUTES.PRODUCT_DETAILS(product.id)}>
                <EyeFilled />
              </Link>
            </Button>

            <Button size="small" type="link">
              <Link href={ROUTES.UPLOAD_IMAGES(product.id)}>
                <UploadOutlined />
              </Link>
            </Button>

            <Button size="small" type="link">
              <Link href={ROUTES.EDIT_PRODUCT(product.id)}>
                <EditFilled />
              </Link>
            </Button>

            <DeleteButton deleteAction={deleteProduct.bind(null, product.id)} />
          </Space>
        ),
      }))}
    />
  );
};
