import { Col, Row } from 'antd';
import SkeletonButton from 'antd/es/skeleton/Button';
import SkeletonInput from 'antd/es/skeleton/Input';

export const FormSkeleton: React.FC = () => {
  return (
    <Row gutter={[10, 20]}>
      <Col span={24}>
        <SkeletonInput active block />
      </Col>

      <Col span={24} className="flex gap-3">
        <SkeletonButton active block />
        <SkeletonButton active block />
      </Col>

      <Col span={24}>
        <SkeletonInput active block />
      </Col>

      <Col span={6}></Col>
      <Col span={12} className="flex justify-center">
        <SkeletonButton active block />
      </Col>
    </Row>
  );
};
