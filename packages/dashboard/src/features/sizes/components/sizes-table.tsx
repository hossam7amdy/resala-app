'use client';

import { deleteSize } from '@/actions/size';
import { PopconfirmDeleteButton, ResalaTooltip } from '@/components';
import { formatDate } from '@/utils/date-time-formatter';
import { EditOutlined } from '@ant-design/icons';
import type { GetSizesListResponse } from '@resala/shared';
import { Table as AntTable, Space } from 'antd';

import { SizeEditorModal } from './size-editor-modal';

export const SizesTable: React.FC<{ sizes: GetSizesListResponse['data'] }> = ({ sizes }) => {
  return (
    <AntTable
      dataSource={sizes}
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
          render: (id: number, size) => (
            <Space>
              <ResalaTooltip title="Edit">
                <SizeEditorModal size={size} buttonProps={{ type: 'link' }}>
                  <EditOutlined />
                </SizeEditorModal>
              </ResalaTooltip>
              <PopconfirmDeleteButton onConfirmDelete={() => deleteSize(id)} />
            </Space>
          ),
        },
      ]}
    />
  );
};
