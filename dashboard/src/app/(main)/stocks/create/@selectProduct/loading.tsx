import FormItem from 'antd/es/form/FormItem';
import SkeletonInput from 'antd/es/skeleton/Input';
import React from 'react';

const Loading = () => {
  return (
    <FormItem>
      <SkeletonInput active block size="large" />
    </FormItem>
  );
};

export default Loading;
