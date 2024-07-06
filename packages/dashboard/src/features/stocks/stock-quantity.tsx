import Text from 'antd/lib/typography/Text';

const StockQuantity: React.FC<{ quantity: number }> = ({ quantity }) => {
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
