'use client';

import { deleteSize } from '@/actions/sizes';
import { PopconfirmDeleteButton, ResalaTooltip } from '@/components';
import { formatDate } from '@/utils/date-time-formatter';
import { EditOutlined } from '@ant-design/icons';
import type { ListSizesResponse } from '@resala/shared';
import { Space, Table } from 'antd';

import { SizeEditorModal } from './size-editor-modal';

export const SizesTable: React.FC<{ sizes: ListSizesResponse['data'] }> = ({ sizes }) => {
  return (
    <Table<ListSizesResponse['data'][number]>
      scroll={{ x: 768, y: 500 }}
      dataSource={sizes}
      pagination={{
        current: 1,
        pageSize: 10,
        total: sizes.length,
        position: ['bottomCenter'],
      }}
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
          render: (id: string, size) => (
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
