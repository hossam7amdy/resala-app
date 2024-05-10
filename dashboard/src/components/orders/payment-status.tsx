import type { GetOrderResponse } from '@resala/shared';
import { Tag } from 'antd';

interface PaymentStatusProps {
  status: GetOrderResponse['data']['paymentStatus'];
}
const PaymentStatus = ({ status }: PaymentStatusProps) => {
  let color = 'default';

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
    <Tag style={{ fontWeight: 500 }} color={color}>
      {status}
    </Tag>
  );
};

export default PaymentStatus;
