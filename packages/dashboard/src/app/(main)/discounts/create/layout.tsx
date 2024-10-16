import { BackButton } from '@/components';
import { ROUTES } from '@/routes';
import { Breadcrumb, Col, Row } from 'antd';
import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Create discount',
};

const CreateDiscountLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Row gutter={[10, 30]}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.DISCOUNTS}>Discounts</Link> },
            { title: 'New' },
          ]}
        />
      </Col>
      <Col span={24}>{children}</Col>
    </Row>
  );
};

export default CreateDiscountLayout;
