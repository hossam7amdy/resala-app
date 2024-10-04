import { Table } from 'antd';
import SkeletonInput from 'antd/es/skeleton/Input';
import React from 'react';

export const TableSkeleton: React.FC = () => {
  return (
    <Table
      scroll={{ x: 'auto' }}
      columns={[
        { title: '', dataIndex: '1' },
        { title: '', dataIndex: '2' },
        { title: '', dataIndex: '3' },
        { title: '', dataIndex: '4' },
      ]}
      dataSource={[1, 2, 3, 4, 5].map(id => ({
        key: id,
        1: <SkeletonInput active />,
        2: <SkeletonInput active />,
        3: <SkeletonInput active />,
        4: <SkeletonInput active />,
      }))}
      pagination={{
        position: ['bottomCenter'],
      }}
    />
  );
};
