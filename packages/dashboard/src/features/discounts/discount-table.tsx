import { Table } from '@/components';
import { formatDate } from '@/utils/date-time-formatter';
import type { ListDiscountsResponse } from '@resala/shared';
import React from 'react';

import { DiscountActions } from './discount-actions';

export const DiscountTable: React.FC<{
  discounts: ListDiscountsResponse['data']['discounts'];
}> = ({ discounts }) => {
  return (
    <Table
      pagination={false}
      columns={[
        { width: 50, title: 'ID', dataIndex: 'id' },
        { width: 125, title: 'Type', dataIndex: 'type' },
        { width: 100, title: 'Amount', dataIndex: 'amount' },
        { width: 100, title: 'Min Qty', dataIndex: 'minQty' },
        { width: 100, title: 'Active', dataIndex: 'isActive' },
        { width: 100, title: 'Storewide', dataIndex: 'isStoreWide' },
        { width: 100, title: 'Products', dataIndex: 'productsCount' },
        { width: 100, title: 'Start Date', dataIndex: 'startDate' },
        { width: 100, title: 'End Date', dataIndex: 'endDate' },
        { width: 100, title: 'Actions', dataIndex: 'actions' },
      ]}
      dataSource={discounts.map(d => ({
        ...d,
        key: d.id,
        isActive: d.isActive ? 'Yes' : 'No',
        isStoreWide: d.isStoreWide ? 'Yes' : 'No',
        startDate: d.startDate ? formatDate(d.startDate) : 'N/A',
        endDate: d.endDate ? formatDate(new Date(d.endDate)) : 'N/A',
        actions: <DiscountActions discount={d} />,
      }))}
    />
  );
};
