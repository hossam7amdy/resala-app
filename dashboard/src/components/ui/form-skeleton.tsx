import { Col, Flex, Row } from 'antd';
import SkeletonButton from 'antd/es/skeleton/Button';
import SkeletonInput from 'antd/es/skeleton/Input';

const FormSkeleton = () => {
  return (
    <Row gutter={[10, 20]}>
      <Col span={24}>
        <SkeletonInput active block />
      </Col>

      <Col span={24}>
        <Flex gap={10}>
          <SkeletonInput active block />
          <SkeletonInput active block />
        </Flex>
      </Col>

      <Col span={24}>
        <Flex gap={10}>
          <SkeletonButton block active />
          <SkeletonButton block active />
        </Flex>
      </Col>
    </Row>
  );
};

export default FormSkeleton;
