import { Flex } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import SkeletonButton from 'antd/es/skeleton/Button';
import SkeletonInput from 'antd/es/skeleton/Input';

const LoadingColorPage = () => {
  return (
    <>
      <FormItem wrapperCol={{ span: 12 }}>
        <SkeletonInput active block size="large" />
      </FormItem>

      <Flex gap={10}>
        <FormItem wrapperCol={{ span: 12 }}>
          <SkeletonButton active block size="large" />
        </FormItem>
        <FormItem wrapperCol={{ span: 12 }}>
          <SkeletonButton active block size="large" />
        </FormItem>
      </Flex>
    </>
  );
};

export default LoadingColorPage;
