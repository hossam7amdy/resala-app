import type { OrderStatusType } from '@resala/shared';
import { Tag, type TagProps } from 'antd';

interface OrderStatusTagProps extends TagProps {
  status: OrderStatusType;
}
const OrderStatusTag: React.FC<OrderStatusTagProps> = ({ status, ...props }) => {
  let color: TagProps['color'] = 'default';

  switch (status) {
    case 'PENDING':
      color = 'warning';
      break;
    case 'FULFILLED':
      color = 'processing';
      break;
    case 'CANCELLED':
      color = 'error';
      break;
    case 'SHIPPED':
      color = 'processing';
      break;
    case 'DELIVERED':
      color = 'success';
      break;
  }

  return (
    <Tag style={{ fontWeight: 500, width: 80 }} color={color} {...props}>
      {status}
    </Tag>
  );
};

export { OrderStatusTag };
