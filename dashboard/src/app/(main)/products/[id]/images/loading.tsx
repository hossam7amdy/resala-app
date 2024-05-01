import { Flex } from 'antd';
import SkeletonImage from 'antd/es/skeleton/Image';
import React from 'react';

const Loading = () => {
  return (
    <Flex gap={15} wrap="wrap" style={{ width: '100%' }}>
      <SkeletonImage style={{ width: 250, height: 250 }} active />
      <SkeletonImage style={{ width: 250, height: 250 }} active />
      <SkeletonImage style={{ width: 250, height: 250 }} active />
      <SkeletonImage style={{ width: 250, height: 250 }} active />
      <SkeletonImage style={{ width: 250, height: 250 }} active />
      <SkeletonImage style={{ width: 250, height: 250 }} active />
    </Flex>
  );
};

export default Loading;
