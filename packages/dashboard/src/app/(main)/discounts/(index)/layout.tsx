import { ROUTES } from '@/routes';
import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Row } from 'antd';
import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Discounts',
};

const DiscountsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Row gutter={[10, 30]}>
      <Col span={24}>
        <Breadcrumb items={[{ title: 'Discounts' }]} />
      </Col>
      <Col span={24} className="flex justify-end">
        <Link href={ROUTES.CREATE_DISCOUNT}>
          <Button type="primary" icon={<PlusOutlined />}>
            Add Discount
          </Button>
        </Link>
      </Col>
      <Col span={24}>{children}</Col>
    </Row>
  );
};

export default DiscountsLayout;
