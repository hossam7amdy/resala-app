import { formatCurrency } from '@/utils/currency-formatter';
import { formatDate } from '@/utils/date-time-formatter';
import type { Product } from '@resala/shared';
import { Image, Table } from 'antd';
import React from 'react';

interface DiscountProductsProps {
  products: Product[];
  className?: HTMLElement['className'];
}
export const DiscountProducts: React.FC<DiscountProductsProps> = ({ products, ...props }) => {
  return (
    <Table
      pagination={false}
      dataSource={products.map(p => ({
        ...p,
        key: p.id,
        price: formatCurrency(+p.price),
        date: formatDate(new Date(p.createdAt)),
        image: <Image src={p.imageUrl} width={75} alt={p.enDescription} />,
      }))}
      columns={[
        { width: 50, align: 'center', title: 'ID', dataIndex: 'id' },
        { width: 100, align: 'center', title: 'Image', dataIndex: 'image' },
        { width: 150, title: 'English', dataIndex: 'enName' },
        { width: 150, title: 'Arabic', dataIndex: 'arName' },
        { width: 100, title: 'Price', dataIndex: 'price' },
        { width: 100, title: 'Created Date', dataIndex: 'date' },
      ]}
      {...props}
    />
  );
};
