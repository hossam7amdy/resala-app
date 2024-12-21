import Text from 'antd/es/typography/Text';

export const StockQuantity: React.FC<{ quantity: number }> = ({ quantity }) => {
  return (
    <Text strong type={textType(quantity)}>
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
