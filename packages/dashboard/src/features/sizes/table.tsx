'use client';

import { deleteSize } from '@/actions/size';
import { PopconfirmDeleteButton, ResalaTooltip } from '@/components';
import { formatDate } from '@/utils/date-time-formatter';
import ROUTES from '@/utils/routes';
import { EditFilled } from '@ant-design/icons';
import type { GetSizesListResponse } from '@resala/shared';
import { Table as AntTable, Space } from 'antd';
import Link from 'next/link';

const Table: React.FC<{ sizes: GetSizesListResponse['data'] }> = ({ sizes }) => {
  return (
    <AntTable
      pagination={{
        current: 1,
        pageSize: 10,
        total: sizes.length,
        position: ['bottomCenter'],
      }}
      scroll={{ x: true, y: 500 }}
      rowKey="id"
      columns={[
        { title: 'Size', dataIndex: 'name' },
        {
          title: 'Created At',
          dataIndex: 'createdAt',
          render: (date: string) => formatDate(new Date(date)),
        },
        {
          title: 'Actions',
          dataIndex: 'id',
          align: 'center',
          render: (id: number) => (
            <Space>
              <ResalaTooltip title="Edit">
                <Link href={ROUTES.EDIT_SIZE(id)}>
                  <EditFilled />
                </Link>
              </ResalaTooltip>
              <PopconfirmDeleteButton onConfirmDelete={() => deleteSize(id)} />
            </Space>
          ),
        },
      ]}
      dataSource={sizes}
    />
  );
};

export default Table;
