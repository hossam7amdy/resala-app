import Text from 'antd/lib/typography/Text';

interface StockQuantityProps {
  quantity: number;
}
const StockQuantity = ({ quantity }: StockQuantityProps) => {
  return (
    <Text type={textType(quantity)} style={{ fontWeight: 'bold' }}>
      {quantity}
    </Text>
  );
};

const textType = (quantity: number) => {
  if (quantity < 3) {
    return 'danger';
  }
  if (quantity < 10) {
    return 'warning';
  }
  return 'success';
};

export default StockQuantity;
