import { BackButton } from '@/components';
import { findProduct } from '@/fetch/products';
import { ROUTES } from '@/routes';
import type { Params } from '@/types';
import { Breadcrumb, Button, Col, Row, Tabs } from 'antd';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
  const id = params.id;

  const product = await findProduct(id);

  return {
    title: product?.enName ? product.enName : 'Not Found',
  };
};

interface LayoutProps {
  params: Params;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, params }) => {
  const headersList = headers();

  const activeKey = headersList.get('x-pathname') || ROUTES.PRODUCT_STOCKS(params.id);

  return (
    <Row gutter={[10, 20]}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.PRODUCTS}>Products</Link> },
            { title: params.id },
          ]}
        />
      </Col>
      <Col span={24}>
        <Tabs
          tabBarExtraContent={
            <Link href={ROUTES.CREATE_STOCK(params.id)}>
              <Button type="primary">Add Stock</Button>
            </Link>
          }
          defaultActiveKey={activeKey}
          items={[
            {
              key: ROUTES.PRODUCT_STOCKS(params.id),
              label: <Link href={ROUTES.PRODUCT_STOCKS(params.id)}>Stocks</Link>,
              children,
            },
            {
              key: ROUTES.PRODUCT_REVIEWS(params.id),
              label: <Link href={ROUTES.PRODUCT_REVIEWS(params.id)}>Reviews</Link>,
              children,
            },
          ]}
        />
      </Col>
    </Row>
  );
};

export default Layout;
