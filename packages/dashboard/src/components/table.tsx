import { Table as AntTable, type TableProps } from 'antd';
import type { AnyObject } from 'antd/es/_util/type';
import React from 'react';

export const Table = <RecordType = AnyObject,>(props: TableProps<RecordType>) => {
  return <AntTable scroll={{ x: 768, y: 500 }} {...props} />;
};
