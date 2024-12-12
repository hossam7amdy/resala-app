import type { PaymentStatusType } from '@resala/shared';
import { Tag, type TagProps } from 'antd';

interface PaymentStatusTagProps extends TagProps {
  status: PaymentStatusType;
}
const PaymentStatusTag: React.FC<PaymentStatusTagProps> = ({ status, ...props }) => {
  let color: TagProps['color'] = 'default';

  switch (status) {
    case 'UNPAID':
      color = 'warning';
      break;
    case 'PAID':
      color = 'success';
      break;
    case 'FAILED':
      color = 'error';
      break;
  }

  return (
    <Tag style={{ fontWeight: 500, width: 90 }} color={color} {...props}>
      {status}
    </Tag>
  );
};

export { PaymentStatusTag };
