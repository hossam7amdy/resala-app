import { classnames } from '@/lib/classnames';
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
  const message = (
    <span>
      Buy {discount.minQty} or more, and get {discount.amount.toString()}
      {discount.type === 'PERCENTAGE'
        ? '% discount'
        : `${+discount.amount > 1 ? ' items' : ' item'} for free`}
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
