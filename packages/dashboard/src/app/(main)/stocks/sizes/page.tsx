import { SizeEditorModal, SizesTable } from '@/features/sizes';
import { listAllSizes } from '@/fetch/sizes';
import { Col, Flex, Row } from 'antd';
import React from 'react';

const SizesPage = async () => {
  const sizes = await listAllSizes();

  return (
    <Row gutter={[10, 20]}>
      <Col span={24}>
        <Flex gap={10} justify="space-between">
          <div></div>
          <SizeEditorModal buttonProps={{ type: 'primary' }}>Add Size</SizeEditorModal>
        </Flex>
      </Col>

      <Col span={24}>
        <SizesTable sizes={sizes} />
      </Col>
    </Row>
  );
};

export default SizesPage;
