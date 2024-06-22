import BackButton from '@/component/back-button';
import { listAllSizes } from '@/data/sizes';
import Table from '@/feature/sizes/table';
import ROUTES from '@/lib/routes';
import { Table as AntTable, Breadcrumb, Button, Col, Flex, Row } from 'antd';
import Link from 'next/link';
import React, { Suspense } from 'react';

const SizesPage = () => {
  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.STOCKS}>Stocks</Link> },
            { title: 'Sizes' },
          ]}
        />
      </Col>

      <Col span={24}>
        <Flex gap={10} justify="space-between">
          <div></div>
          <Link href={ROUTES.CREATE_SIZE}>
            <Button type="primary">Add New</Button>
          </Link>
        </Flex>
      </Col>

      <Col span={24}>
        <Suspense fallback={<AntTable loading />}>
          <SizesTable />
        </Suspense>
      </Col>
    </Row>
  );
};

const SizesTable = async () => {
  const sizes = await listAllSizes();

  return <Table sizes={sizes} />;
};

export default SizesPage;
