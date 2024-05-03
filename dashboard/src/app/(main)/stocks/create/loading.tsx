import { Flex } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import SkeletonButton from 'antd/es/skeleton/Button';
import SkeletonInput from 'antd/es/skeleton/Input';
import React from 'react';

const Loading = () => {
  return (
    <>
      <FormItem>
        <SkeletonInput active block />
      </FormItem>

      <FormItem>
        <SkeletonInput active block />
      </FormItem>

      <FormItem>
        <SkeletonInput active block />
      </FormItem>

      <FormItem>
        <SkeletonInput active block />
      </FormItem>

      <FormItem>
        <Flex gap={10}>
          <SkeletonButton active block />
          <SkeletonButton active block />
        </Flex>
      </FormItem>
    </>
  );
};

export default Loading;
