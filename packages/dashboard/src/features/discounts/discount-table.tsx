'use client';

import { IconLink, Table } from '@/components';
import { useCreateSearchParams } from '@/hooks';
import { ROUTES } from '@/routes';
import { formatDate } from '@/utils/date-time-formatter';
import type { ListDiscountsResponse } from '@resala/shared';
import { Card, DatePicker, type TableProps } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import { DiscountActions } from './discount-actions';

const extractFilterValueFromSearchParams = (searchParams: URLSearchParams, key: string) => {
  const value = searchParams.get(key);
  return value ? [value] : null;
};

const TableDateFilter: React.FC<FilterDropdownProps> = ({
  selectedKeys,
  setSelectedKeys,
  confirm,
}) => {
  const defaultValue = selectedKeys.at(0)
    ? dayjs(selectedKeys.at(0) as string, { format: 'date' })
    : undefined;

  return (
    <Card size="small">
      <DatePicker
        needConfirm
        mode="date"
        defaultValue={defaultValue}
        onChange={(_, date) => {
          setSelectedKeys([date as string]);
          confirm({ closeDropdown: true });
        }}
      />
    </Card>
  );
};

export const DiscountTable: React.FC<{
  data: Partial<ListDiscountsResponse['data']>;
}> = ({ data: { discounts, pagination } }) => {
  const searchParams = useSearchParams();
  const { createSearchParams } = useCreateSearchParams();

  const handleFilterChange: TableProps['onChange'] = ({ current, pageSize }, filters) => {
    const filterParams = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        acc[key] = value?.at(0) ?? '';
        return acc;
      },
      {} as Record<string, unknown>
    );

    const newSearchParams = {
      page: current ?? 1,
      limit: pageSize ?? 10,
      ...filterParams,
    } as Record<string, string | number | boolean>;

    createSearchParams(newSearchParams);
  };

  return (
    <Table
      pagination={{
        current: pagination?.page,
        pageSize: pagination?.limit,
        total: pagination?.total,
        position: ['bottomCenter'],
      }}
      columns={[
        {
          width: 75,
          align: 'center',
          title: 'ID',
          dataIndex: 'id',
          filteredValue: null,
        },
        {
          width: 125,
          title: 'Type',
          dataIndex: 'type',
          filterMultiple: false,
          filteredValue: extractFilterValueFromSearchParams(searchParams, 'type'),
          filters: [
            { text: 'BOGO', value: 'BOGO' },
            { text: 'Percentage', value: 'PERCENTAGE' },
            { text: 'Fixed', value: 'FIXED' },
            { text: 'Bulk', value: 'BULK' },
          ],
        },
        {
          width: 100,
          align: 'center',
          title: 'Quantity',
          dataIndex: 'minQty',
          filteredValue: null,
        },
        {
          width: 100,
          align: 'center',
          title: 'Amount',
          dataIndex: 'amount',
          filteredValue: null,
        },
        {
          width: 100,
          align: 'center',
          title: 'Active',
          dataIndex: 'isActive',
          filterMultiple: false,
          filteredValue: extractFilterValueFromSearchParams(searchParams, 'isActive')
            ? [searchParams.get('isActive')!]
            : null,
          filters: [
            { text: 'Yes', value: true },
            { text: 'No', value: false },
          ],
        },
        {
          width: 100,
          align: 'center',
          title: 'Storewide',
          dataIndex: 'isStoreWide',
          filterMultiple: false,
          filteredValue: extractFilterValueFromSearchParams(searchParams, 'isStoreWide'),
          filters: [
            { text: 'Yes', value: true },
            { text: 'No', value: false },
          ],
        },
        {
          width: 100,
          align: 'center',
          title: 'Products',
          dataIndex: 'products',
          filteredValue: null,
        },
        {
          width: 100,
          title: 'Start Date',
          dataIndex: 'startDate',
          filteredValue: extractFilterValueFromSearchParams(searchParams, 'startDate'),
          filterDropdown: TableDateFilter,
        },
        {
          width: 100,
          title: 'End Date',
          dataIndex: 'endDate',
          filteredValue: extractFilterValueFromSearchParams(searchParams, 'endDate'),
          filterDropdown: TableDateFilter,
        },
        {
          width: 100,
          title: 'Actions',
          dataIndex: 'actions',
          filteredValue: null,
        },
      ]}
      dataSource={discounts?.map(d => ({
        ...d,
        key: d.id,
        id: d.isStoreWide ? (
          d.id
        ) : (
          <IconLink href={ROUTES.DISCOUNT_PRODUCTS(d.id)}>{d.id}</IconLink>
        ),
        products: d.isStoreWide ? 'All' : d.productsCount,
        isActive: d.isActive ? 'Yes' : 'No',
        isStoreWide: d.isStoreWide ? 'Yes' : 'No',
        startDate: d.startDate ? formatDate(d.startDate) : 'N/A',
        endDate: d.endDate ? formatDate(new Date(d.endDate)) : 'N/A',
        actions: <DiscountActions discount={d} />,
      }))}
      onChange={handleFilterChange}
    />
  );
};
