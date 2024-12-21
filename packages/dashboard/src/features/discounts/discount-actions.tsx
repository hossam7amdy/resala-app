'use client';

import { deleteDiscount } from '@/actions/discount';
import { PopconfirmDeleteButton } from '@/components';
import { ROUTES } from '@/routes';
import { EditOutlined } from '@ant-design/icons';
import type { Discount } from '@resala/shared';
import { Flex } from 'antd';
import Link from 'next/link';
import React from 'react';

export const DiscountActions: React.FC<{ discount: Discount }> = ({ discount }) => {
  return (
    <Flex gap={5} align="center">
      <Link href={ROUTES.EDIT_DISCOUNT(discount.id)}>
        <EditOutlined />
      </Link>
      <PopconfirmDeleteButton onConfirmDelete={() => deleteDiscount(discount.id.toString())} />
    </Flex>
  );
};
