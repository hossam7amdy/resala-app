import { Col, List, Row } from 'antd';
import React from 'react';

const Loading = () => {
  return (
    <Row gutter={5}>
      <Col span={24} lg={{ span: 12 }}>
        <List loading />
      </Col>
      <Col span={24} lg={{ span: 12 }}>
        <List loading />
      </Col>
    </Row>
  );
};

export default Loading;
