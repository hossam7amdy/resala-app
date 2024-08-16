import { listAllColors } from '@/data/colors';
import { ColorsTable } from '@/features/colors';
import { ColorEditorModal } from '@/features/colors';
import { Col, Flex, Row } from 'antd';

const ColorsPage = async () => {
  const colors = await listAllColors();

  return (
    <Row gutter={[10, 20]}>
      <Col span={24}>
        <Flex gap={10} justify="space-between">
          <div></div>
          <ColorEditorModal buttonProps={{ type: 'primary' }}>Add color</ColorEditorModal>
        </Flex>
      </Col>

      <Col span={24}>
        <ColorsTable colors={colors} />
      </Col>
    </Row>
  );
};

export default ColorsPage;
