import List from '@/components/colors/list';
import BackButton from '@/components/ui/back-button';
import { listAllColors } from '@/data/colors';
import { List as AntList, Breadcrumb, Col, Row } from 'antd';
import React, { Suspense } from 'react';

const ColorsPage = () => {
  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb items={[{ title: <BackButton /> }, { title: 'Colors' }]} />
      </Col>

      <Col span={24}>
        <Suspense fallback={<AntList loading />}>
          <ColorsList />
        </Suspense>
      </Col>
    </Row>
  );
};

const ColorsList = async () => {
  const colors = await listAllColors();

  return <List colors={colors} />;
};

export default ColorsPage;
