import Pagination from '@/components/ui/pagination';
import { listProductsPaginated } from '@/data/product';
import { formatCurrency, formatDate } from '@/lib/util';
import { type DefaultRequestQuery } from '@resala/shared';
import { Flex, Table } from 'antd';

export const ProductTable = async (searchParams: Partial<DefaultRequestQuery['query']>) => {
  const { products, pagination } = await listProductsPaginated(searchParams as any);

  return (
    <>
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
        ]}
        dataSource={products.map(product => ({
          key: product.id,
          enName: product.enName,
          arName: product.arName,
          category: product.category.arName,
          price: formatCurrency(product.price),
          deletedAt: product.deletedAt ? 'No' : 'Yes',
          createdAt: formatDate(product.createdAt),
        }))}
      />
      <Flex justify="center">
        <Pagination totalPages={pagination.total} />
      </Flex>
    </>
  );
};
