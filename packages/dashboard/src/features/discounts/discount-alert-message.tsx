import { classnames } from '@/utils/classnames';
import type { Discount } from '@resala/shared';
import { Alert } from 'antd';
import type { AlertProps } from 'antd';
import React from 'react';

interface DiscountAlertMessageProps extends AlertProps {
  discount: Discount;
}
export const DiscountAlertMessage: React.FC<DiscountAlertMessageProps> = ({
  discount,
  className,
}) => {
  const { minQty, amount } = discount;

  const message = (
    <span>
      Buy {minQty} {minQty > 1 ? 'items' : 'item'}, and get {+amount}
      {discount.type === 'PERCENTAGE'
        ? '% discount'
        : `${+amount > 1 ? ' items' : ' item'} for free`}
    </span>
  );

  return (
    <Alert
      showIcon
      type="info"
      className={classnames('font-semibold', className)}
      message={message}
      description={discount.description}
    />
  );
};
