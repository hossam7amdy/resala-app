import BackButton from '@/component/back-button';
import { listAllColors } from '@/data/colors';
import Table from '@/feature/colors/table';
import ROUTES from '@/lib/routes';
import { Table as AntList, Breadcrumb, Button, Col, Flex, Row } from 'antd';
import Link from 'next/link';
import React, { Suspense } from 'react';

const ColorsPage = () => {
  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb items={[{ title: <BackButton /> }, { title: 'Colors' }]} />
      </Col>

      <Col span={24}>
        <Flex gap={10} justify="space-between">
          <div></div>
          <Link href={ROUTES.CREATE_COLOR}>
            <Button type="primary">Add New</Button>
          </Link>
        </Flex>
      </Col>

      <Col span={24}>
        <Suspense fallback={<AntList loading />}>
          <ColorsTable />
        </Suspense>
      </Col>
    </Row>
  );
};

const ColorsTable = async () => {
  const colors = await listAllColors();

  return <Table colors={colors} />;
};

export default ColorsPage;
