'use client';

import BackButton from '@/components/ui/back-button';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Button, Col, Row, Tabs } from 'antd';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const Layout = ({
  params,
  images,
  stocks,
}: {
  params: { id: string };
  images: React.ReactNode;
  stocks: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const activeTab = searchParams?.get('tab') || 'images';

  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: 'Products', href: ROUTES.PRODUCTS },
            { title: 'Details' },
          ]}
        />
      </Col>
      <Col span={24}>
        <Tabs
          tabBarExtraContent={<ExtraAction id={params.id} tab={activeTab} />}
          activeKey={activeTab}
          items={[
            {
              key: 'images',
              label: <Link href={ROUTES.PRODUCT_IMAGES(params.id)}>Images</Link>,
              children: images,
            },
            {
              key: 'stocks',
              label: <Link href={ROUTES.PRODUCT_STOCKS(params.id)}>Stocks</Link>,
              children: stocks,
            },
          ]}
        />
      </Col>
    </Row>
  );
};

const ExtraAction = ({ id, tab }: { id: string; tab: string }) => {
  if (tab === 'images') {
    return (
      <Link href={ROUTES.UPLOAD_IMAGES(id)}>
        <Button type="primary">Add Image</Button>
      </Link>
    );
  }
  return (
    <Link href={ROUTES.CREATE_STOCK(id)}>
      <Button type="primary">Add Stock</Button>
    </Link>
  );
};

export default Layout;
