import { BackButton } from '@/components';
import { ROUTES } from '@/routes';
import type { Params } from '@/types';
import { Breadcrumb, Col, Row } from 'antd';
import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Edit discount',
};

interface EditDiscountLayoutProps {
  params: Params;
  children: React.ReactNode;
}
const EditDiscountLayout: React.FC<EditDiscountLayoutProps> = ({ params, children }) => {
  return (
    <Row gutter={[10, 30]}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.DISCOUNTS}>Discounts</Link> },
            { title: params.id },
            { title: 'Edit' },
          ]}
        />
      </Col>
      <Col span={24}>{children}</Col>
    </Row>
  );
};

export default EditDiscountLayout;
