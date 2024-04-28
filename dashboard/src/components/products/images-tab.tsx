import { deleteProductImage } from '@/actions/product';
import DeleteButton from '@/components/ui/delete-button';
import { getProductImages } from '@/data/product';
import { formatDate } from '@/lib/util';
import { Card, Flex, Image } from 'antd';
import React from 'react';

const ImagesTab = async ({ id }: { id: string }) => {
  const images = await getProductImages(id);

  return (
    /* eslint-disable react/jsx-key */
    <ul style={{ listStyle: 'none' }}>
      <Flex gap={15} wrap="wrap">
        {images?.map(image => (
          <li key={image.id}>
            <Card
              key={image.id}
              size="small"
              actions={[
                <p>{formatDate(image.createdAt)}</p>,
                <DeleteButton deleteAction={deleteProductImage.bind(null, id, String(image.id))} />,
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

export default ImagesTab;
