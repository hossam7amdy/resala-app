'use client';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

const BackButton: React.FC = () => {
  const router = useRouter();

  return <Button size="small" type="link" icon={<ArrowLeftOutlined />} onClick={router.back} />;
};

export default BackButton;
