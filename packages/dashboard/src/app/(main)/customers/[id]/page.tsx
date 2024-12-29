import { getUserById } from '@/actions/users';
import { BackButton } from '@/components';
import { CustomerDetailsCard, RecentOrdersList, SummaryOverview } from '@/features/customers';
import { ROUTES } from '@/routes';
import type { Params } from '@/types';
import { Breadcrumb, Col, Row } from 'antd';
import Link from 'next/link';
import React from 'react';

const EditCustomerPage = async (props: { params: Params }) => {
  const params = await props.params;
  const user = await getUserById(params.id);

  return (
    <Row gutter={[10, 10]}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.CUSTOMERS}>Customers</Link> },
            { title: user?.name || user.firstName },
          ]}
        />
      </Col>
      <Col span={24}>
        <SummaryOverview ordersCount={user.ordersCount} />
      </Col>
      <Col span={14}>
        <RecentOrdersList orders={user.latestOrders} />
      </Col>
      <Col span={10}>
        <CustomerDetailsCard user={user} />
      </Col>
    </Row>
  );
};

export default EditCustomerPage;
