import { Button, ButtonProps } from 'antd';
import { useFormStatus } from 'react-dom';

const SubmitButton = ({ children, ...btnProps }: { children: React.ReactNode } & ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button htmlType="submit" loading={pending} {...btnProps}>
      {children}
    </Button>
  );
};

export default SubmitButton;
