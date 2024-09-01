import { Card, Col, Row } from 'antd';
import React from 'react';

const Loading = () => {
  return (
    <Row gutter={[10, 20]}>
      <Col span={24} sm={{ span: 12 }} md={{ span: 8 }}>
        <Card style={{ height: 200 }} loading />
      </Col>
      <Col span={24} sm={{ span: 12 }} md={{ span: 8 }}>
        <Card style={{ height: 200 }} loading />
      </Col>
      <Col span={24} sm={{ span: 12 }} md={{ span: 8 }}>
        <Card style={{ height: 200 }} loading />
      </Col>
      <Col span={24} sm={{ span: 12 }} md={{ span: 8 }}>
        <Card style={{ height: 200 }} loading />
      </Col>
      <Col span={24} sm={{ span: 12 }} md={{ span: 8 }}>
        <Card style={{ height: 200 }} loading />
      </Col>
      <Col span={24} sm={{ span: 12 }} md={{ span: 8 }}>
        <Card style={{ height: 200 }} loading />
      </Col>
    </Row>
  );
};

export default Loading;
