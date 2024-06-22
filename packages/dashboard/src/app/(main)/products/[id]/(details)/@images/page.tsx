import { deleteProductImage } from '@/actions/image';
import DeleteButton from '@/component/delete-button';
import { listProductStocks } from '@/data/product';
import { formatDate } from '@/lib/util';
import { Card, Flex, Image } from 'antd';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Product Images',
};

const ProductImagesPage = async ({ params }: { params: { id: string } }) => {
  const stocks = await listProductStocks(params.id);
  const images = stocks.flatMap(stock => stock.images);

  return (
    <ul style={{ listStyle: 'none' }}>
      <Flex gap={15} wrap="wrap">
        {images?.map(image => (
          <li key={image.id}>
            <Card
              size="small"
              actions={[
                <p key={`created-date-${image.id}`}>{formatDate(image.createdAt)}</p>,
                <DeleteButton
                  key={`delete-${image.id}`}
                  deleteAction={deleteProductImage.bind(null, params.id, image.id.toString())}
                />,
              ]}
              hoverable
              cover={
                <Image
                  src={image.imageUrl}
                  alt="Product Image"
                  width={300}
                  height={300}
                  style={{ objectFit: 'cover' }}
                />
              }
            />
          </li>
        ))}
      </Flex>
    </ul>
  );
};

export default ProductImagesPage;
