// Parallel Routes cause redundant RSC fetches on navigation
// https://github.com/vercel/next.js/issues/65878
import { Card, Col, Row } from 'antd';
import React from 'react';

export const Fallback = () => {
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
