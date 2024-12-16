import { Table as AntTable, type TableProps } from 'antd';
import React from 'react';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function Table<T>(props: TableProps<T>) {
  return (
    <AntTable
      size="small"
      scroll={{ x: true }}
      pagination={{ hideOnSinglePage: true }}
      {...props}
    />
  );
}
