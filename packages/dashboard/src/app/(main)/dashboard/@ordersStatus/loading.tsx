import { BarChartOutlined } from '@ant-design/icons';
import SkeletonNode from 'antd/es/skeleton/Node';
import React from 'react';

const Loading = () => {
  return (
    <SkeletonNode active className="w-full h-[300px]">
      <BarChartOutlined className="text-[300px] opacity-50 rotate-90" />
    </SkeletonNode>
  );
};

export default Loading;
