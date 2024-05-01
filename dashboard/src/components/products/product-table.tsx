'use server';

import { deleteProduct } from '@/actions/product';
import { DeleteButton } from '@/components/ui/delete-button';
import Pagination from '@/components/ui/pagination';
import { listProductsPaginated } from '@/data/product';
import ROUTES from '@/lib/routes';
import { formatCurrency, formatDate } from '@/lib/util';
import { EditFilled, EyeFilled, UploadOutlined } from '@ant-design/icons';
import { type DefaultRequestQuery } from '@resala/shared';
import { Button, Flex, Space, Table } from 'antd';
import Link from 'next/link';

import DisableButton from './disable-button';

export const ProductTable = async (searchParams: Partial<DefaultRequestQuery['query']>) => {
  const { products, pagination } = await listProductsPaginated(searchParams);

  return (
    <Flex vertical gap={10}>
      <Table
        pagination={false}
        columns={[
          {
            title: 'English',
            dataIndex: 'enName',
          },
          {
            title: 'Arabic',
            dataIndex: 'arName',
          },
          {
            title: 'Category',
            dataIndex: 'category',
          },
          {
            title: 'Price',
            dataIndex: 'price',
          },
          {
            title: 'Is Active',
            dataIndex: 'deletedAt',
          },
          {
            title: 'Create Date',
            dataIndex: 'createdAt',
          },
          {
            title: 'Actions',
            dataIndex: 'actions',
            align: 'center',
          },
        ]}
        dataSource={products.map(product => ({
          key: product.id,
          enName: product.enName,
          arName: product.arName,
          category: product.category.arName,
          price: formatCurrency(product.price),
          deletedAt: <DisableButton product={product} />,
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
      <Flex justify="center">
        <Pagination totalPages={pagination.total} />
      </Flex>
    </Flex>
  );
};
