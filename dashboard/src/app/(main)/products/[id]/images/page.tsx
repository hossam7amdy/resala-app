import { deleteProductImage } from '@/actions/product';
import BackButton from '@/components/ui/back-button';
import DeleteButton from '@/components/ui/delete-button';
import { getProductImages } from '@/data/product';
import ROUTES from '@/lib/routes';
import { formatDate } from '@/lib/util';
import { Breadcrumb, Button, Card, Col, Divider, Flex, Image, Row } from 'antd';
import Link from 'next/link';
import React from 'react';

const ImagesTab = async ({ params }: { params: { id: string } }) => {
  const images = await getProductImages(params.id);

  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: 'Products', href: ROUTES.PRODUCTS },
            { title: 'Details' },
            {
              title: 'Images',
              menu: {
                activeKey: 'images',
                items: [
                  { key: 'images', label: <Link href="/images">Images</Link> },
                  { key: 'stocks', label: <Link href="/stocks">Stocks</Link> },
                ],
              },
            },
          ]}
        />
      </Col>
      <Col span={24} style={{ textAlign: 'end' }}>
        <Button type="primary">Upload Images</Button>
        <Divider />
      </Col>
      <Col span={24}>
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
                      deleteAction={deleteProductImage.bind(null, params.id, String(image.id))}
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
      </Col>
    </Row>
  );
};

export default ImagesTab;
