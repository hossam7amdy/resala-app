import { Table as AntTable, TableProps } from 'antd';
import React from 'react';

export const Table: React.FC<TableProps> = props => {
  return <AntTable scroll={{ x: 768, y: 500 }} {...props} />;
};
