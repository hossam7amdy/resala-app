import { Search } from '@/components';
import { MediaUpload } from '@/features/media';
import { Breadcrumb, Col, Row } from 'antd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Media',
};

const MediaLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Row gutter={[10, 20]}>
      <Col span={24}>
        <Breadcrumb items={[{ title: 'Media' }]} />
      </Col>

      <Col span={24} className="flex justify-end">
        <MediaUpload />
      </Col>

      <Col span={24}>
        <Search placeholder="Find media by name" />
      </Col>

      <Col span={24}>{children}</Col>
    </Row>
  );
};

export default MediaLayout;
