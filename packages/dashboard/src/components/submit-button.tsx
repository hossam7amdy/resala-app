'use client';

import { Button, type ButtonProps } from 'antd';
import { useFormStatus } from 'react-dom';

const SubmitButton: React.FC<{ children: React.ReactNode } & ButtonProps> = ({
  children,
  ...btnProps
}) => {
  const { pending } = useFormStatus();

  return (
    <Button htmlType="submit" loading={pending} {...btnProps}>
      {children}
    </Button>
  );
};

export default SubmitButton;
