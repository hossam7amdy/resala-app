'use client';

import { deleteProductImage } from '@/actions/image';
import { DeleteButton } from '@/components';
import { formatDate } from '@/lib/util';
import type { Image } from '@resala/shared';
import { Image as AntImage, Table } from 'antd';
import React from 'react';

const StockColorImages: React.FC<{ images: Omit<Image, 'colorId'>[] }> = ({ images }) => (
  <Table
    bordered
    rowKey={image => image.id}
    pagination={false}
    dataSource={images}
    columns={[
      {
        title: 'Image',
        dataIndex: 'imageUrl',
        key: 'imageUrl',
        align: 'center',
        width: 240,
        render: imageUrl => <AntImage src={imageUrl} alt="Product Image" height={100} />,
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 120,
        align: 'center',
        render: createdAt => formatDate(createdAt),
      },
      {
        title: 'Actions',
        width: 150,
        align: 'center',
        dataIndex: 'id',
        key: 'id',
        render: (id, record) => (
          <DeleteButton deleteAction={deleteProductImage.bind(null, `${record.productId}`, id)} />
        ),
      },
    ]}
  />
);

export default StockColorImages;
